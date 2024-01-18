export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();
  console.log("auth", auth);
  const config = useRuntimeConfig();

  if (!auth) {
    return navigateTo(config.public.clientUrl + "/api/login", {
      external: true,
    });
  }

  return true;
});
