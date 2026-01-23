import { borderLeftWidth } from "html2canvas/dist/types/css/property-descriptors/border-width";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s - SNC Payroll System", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon-32x32.ico'}
      ]
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  ssr: false,
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    plugins: [vuetify({ autoImport: true })],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  modules: ["@pinia/nuxt", "nuxt-snackbar"],
  snackbar: {
    top: true,
    bottom: false,
    right: true,
    duration: 3000,
    border: 'left',
  },
  runtimeConfig: {
    public: {
      //@ts-ignore
      strapiUrl: process.env.BASE_URL,
    },
  },
});
