export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();
  // console.log("auth", auth);

  if (!auth.user || !auth.loggedIn) {
    return navigateTo(process.env.NUXT_CLIENT_URL + "/api/login", {
      external: true,
    });
  }

  return true;
});
