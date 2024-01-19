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

  const characterId = getRouterParam(event, "characterId");

  const character = await db.companion.findUnique({
    where: {
      id: characterId,
      userId: user.id,
    },
  });

  return character;
});
