import Stripe from "stripe";
import { db } from "~/prisma";
import { SETTINGS_URL, getUser, stripe } from "~/utils";

export default defineEventHandler(async (event) => {
  let stripeSession:
    | Stripe.Response<Stripe.BillingPortal.Session>
    | Stripe.Response<Stripe.Checkout.Session>
    | null = null;

  try {
    const user = await getUser(event.context.kinde);

    if (!user.id) {
      return {
        status: 401,
        message: "Unauthorized",
      };
    }

    const userSubscription = await db.userSubscription.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: SETTINGS_URL,
      });

      console.log("stripeSession", stripeSession);

      return {
        url: stripeSession.url,
      };
    }

    stripeSession = await stripe.checkout.sessions.create({
      success_url: SETTINGS_URL,
      cancel_url: SETTINGS_URL,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Characters Pro",
              description: "Create Custom AI Characters",
            },
            unit_amount: 999,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    });

    return {
      url: stripeSession.url,
    };

    // return true;
  } catch (error) {
    console.log("[STRIPE]", error);
    return {
      message: "Internal Error",
      status: 500,
    };
  }
});
