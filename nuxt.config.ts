// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/kinde",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    // "@nuxtjs/cloudinary", useless module. Use cloudinary REST api instead.
  ],

  pinia: {
    storesDirs: ["./stores/**"],
  },

  components: [{ path: "~/components" }, { path: "~/layouts" }],

  devServer: {
    port: 3333,
  },

  runtimeConfig: {
    public: {
      cloudName: process.env.NUXT_CLOUDINARY_CLOUD_NAME,
      cldPreset: process.env.NUXT_CLOUDINARY_UPLOAD_PRESET,
      clientUrl: process.env.NUXT_CLIENT_URL,
    },
  },
});
