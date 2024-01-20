import { db } from "~/prisma";
import { checkSubscription, getUser } from "~/utils";

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

  try {
    const chatId = getRouterParam(event, "chatId");

    const character = await db.companion.findUnique({
      where: {
        id: chatId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          where: {
            userId: user.id,
          },
        },
        _count: {
          select: {
            messages: true,
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

    return character;
  } catch (error) {
    return {
      message: "Internal Error",
      status: 500,
    };
  }
});
