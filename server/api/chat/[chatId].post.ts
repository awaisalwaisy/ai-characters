import { LangChainStream, StreamingTextResponse } from "ai";
import { CallbackManager } from "langchain/callbacks";
import { Replicate } from "langchain/llms/replicate";
import { db } from "~/prisma";
import { MemoryManager, checkSubscription, getUser, rateLimit } from "~/utils";

export default defineEventHandler(async (event) => {
  const user = await getUser(event.context.kinde);
  const isPro = await checkSubscription(user.id);

  if (!user || !user.id || !user?.given_name) {
    return {
      response: "Unauthorized",
      status: 401,
    };
  } else if (!isPro) {
    return {
      response: "Please upgrade your subscription",
    };
  }

  const chatId = getRouterParam(event, "chatId");
  const { prompt } = await readBody<{ prompt: string }>(event);

  try {
    const identifier = event.node.req.url + "=" + user.id;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return {
        response: "Too many requests", // Rate limit exceeded
        status: 429,
      };
    }

    const character = await db.companion.update({
      where: {
        id: chatId,
      },
      data: {
        messages: {
          create: {
            content: prompt,
            role: "user",
            userId: user.id,
          },
        },
      },
    });

    if (!character) {
      return {
        response: "Character not found",
        status: 404,
      };
    }

    const name = character.id;
    const companion_file_name = name + ".txt";

    const companionKey = {
      companionName: name!,
      userId: user.id,
      modelName: "llama2-13b",
    };
    const memoryManager = await MemoryManager.getInstance();

    const records = await memoryManager.readLatestHistory(companionKey);
    if (records.length === 0) {
      await memoryManager.seedChatHistory(character.seed, "\n\n", companionKey);
    }
    await memoryManager.writeToHistory("User: " + prompt + "\n", companionKey);

    // Query Pinecone

    const recentChatHistory = await memoryManager.readLatestHistory(
      companionKey
    );

    // Right now the preamble is included in the similarity search, but that
    // shouldn't be an issue

    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      companion_file_name
    );

    let relevantHistory = "";
    if (!!similarDocs && similarDocs.length !== 0) {
      relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");
    }
    const { handlers } = LangChainStream();
    // Call Replicate for inference
    const model = new Replicate({
      model:
        "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
      input: {
        max_length: 2048,
      },
      apiKey: process.env.REPLICATE_API_TOKEN,
      callbackManager: CallbackManager.fromHandlers(handlers),
    });

    // Turn verbose on for debugging
    model.verbose = true;

    const resp = String(
      await model
        .call(
          `
        ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${character.name}: prefix. 

        ${character.instructions}

        Below are relevant details about ${character.name}'s past and the conversation you are in.
        ${relevantHistory}


        ${recentChatHistory}\n${character.name}:`
        )
        .catch(console.error)
    );

    const cleaned = resp.replaceAll(",", "");
    const chunks = cleaned.split("\n");
    const response = chunks[0];

    await memoryManager.writeToHistory("" + response.trim(), companionKey);
    const Readable = require("stream").Readable;

    let s = new Readable();
    s.push(response);
    s.push(null);

    if (response !== undefined && response.length > 1) {
      memoryManager.writeToHistory("" + response.trim(), companionKey);

      await db.companion.update({
        where: {
          id: chatId,
        },
        data: {
          messages: {
            create: {
              content: response.trim(),
              role: "system",
              userId: user.id,
            },
          },
        },
      });
    }

    return new StreamingTextResponse(s);
  } catch (error) {
    return {
      message: "Internal Error",
      status: 500,
    };
  }
});
