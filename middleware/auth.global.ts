import { defineNuxtRouteMiddleware, useNuxtApp } from "#imports";

export default defineNuxtRouteMiddleware(() => {
  if (!useNuxtApp().$auth.loggedIn) {
    if (import.meta.server) {
      return navigateTo(process.env.NUXT_CLIENT_URL + "/api/login", {
        external: true,
      });
    } else {
      console.log("Not logged in...");
    }
    // return abortNavigation();
  }
});
