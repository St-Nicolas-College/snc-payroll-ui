import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s - SNC Payroll System", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: false,
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [
      vuetify({ autoImport: true }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      //@ts-ignore
      strapiUrl: process.env.BASE_URL
    }
  }
})
