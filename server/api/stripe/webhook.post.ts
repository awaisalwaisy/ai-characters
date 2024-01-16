import Stripe from "stripe";
import { db } from "~/prisma";
import { stripe } from "~/utils";

export default defineEventHandler(async (event) => {
  const signature = event.node.req.headers["stripe-signature"] as string;
  // getHeaders(event.node.req)
  const body = (await readRawBody(event)) as string;

  console.log(signature, "signature");
  console.log(typeof signature, "stringify");

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.log("[STRIPE WEBHOOK Error]", error);
    return {
      message: `Webhook Error: ${error.message}`,
      status: 400,
    };
  }

  const session = stripeEvent.data.object as Stripe.Checkout.Session;

  // https://stripe.com/docs/api/events/types - checking and creating user subscription
  if (stripeEvent.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      return {
        message: "User id is required",
        status: 401,
      };
    }

    await db.userSubscription.create({
      data: {
        userId: session?.metadata?.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  // https://stripe.com/docs/api/events/types - updating user subscription
  if (stripeEvent.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await db.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  return {
    message: "Success",
    status: 200,
  };
});
