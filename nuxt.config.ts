// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/kinde",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
  ],

  pinia: {
    storesDirs: ["./stores/**"],
  },

  components: [{ path: "~/components" }, { path: "~/layouts" }],

  devServer: {
    port: 3333,
  },
});
