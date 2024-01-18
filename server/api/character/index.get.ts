import { checkSubscription, getUser } from "~/utils";

export default defineEventHandler(async (event) => {
  const user = await getUser(event.context.kinde);
  //   const isPro = await $fetch(process.env.CLIENT_URL + "/api/ispro");
  //   const ispro = await $fetch("/api/ispro");
  const isPro = await checkSubscription(user.id);

  console.log("user", isPro);
  return isPro;
});
