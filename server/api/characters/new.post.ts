import { db } from "~/prisma";
import { ADD_CHARACTER_SCHEMA, checkSubscription, getUser } from "~/utils";

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

  const result = await readValidatedBody(event, (body) =>
    ADD_CHARACTER_SCHEMA.safeParse(body)
  );

  if (!result.success)
    return {
      response: result.error.issues,
    };

  try {
    const body = result.data;
    const character = await db.companion.create({
      data: {
        userId: user.id,
        userName: user.given_name,
        ...body,
      },
    });

    return {
      message: "Character added successfully",
      response: character,
    };
  } catch (error) {
    console.log("[CHARACTER_POST]", error);
    return {
      message: "Internal Error",
      status: 500,
    };
  }
});
