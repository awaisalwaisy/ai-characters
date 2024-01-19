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

  const { categoryId } = getQuery(event);

  const data = await db.companion.findMany({
    where: {
      categoryId: categoryId?.toString(),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  return data;
});
