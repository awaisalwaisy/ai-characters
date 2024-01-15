import { AuthUserResponse } from "~/@types/application";
import { prisma as db } from "~/prisma/prisma-client";
import { DAY_IN_MS } from "~/utils";

export default defineEventHandler(async (event) => {
  const user: AuthUserResponse = await event.context.kinde.getUserProfile();
  if (!user.id) return;

  const userSubscription = await db.userSubscription.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
});
