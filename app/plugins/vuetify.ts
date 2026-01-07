import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as directives from "vuetify/directives";
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VPullToRefresh } from "vuetify/labs/VPullToRefresh";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
     components: {
    VDateInput,
    VPullToRefresh,
  },
    theme: {
      themes: {
        light: {
          colors: {
            primary: "#4CAF50", // Example primary color
            secondary: "#424242", // Example secondary color
            accent: "#82B1FF", // Example accent color
            error: "#FF5252",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#FB8C00",
            background: "#F5F7F8", // Light background color for the overall page
            surface: "#FFFFFF", // Card/component background color
          },
        },
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
