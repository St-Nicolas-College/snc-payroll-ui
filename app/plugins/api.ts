export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore();
const strapiBaseUrl = useRuntimeConfig().public.strapiUrl;
  const api = $fetch.create({
    baseURL: `${strapiBaseUrl}/api`,
    credentials: "include",

    onRequest({ options }) {
      if (auth.accessToken) {
        options.headers = {
          ...options.headers,
          //@ts-ignore
          Authorization: `Bearer ${auth.accessToken}`,
        };
      }
    },

    async onResponseError({ response, request, options }) {
      if (response.status === 401) {
        try {
          const refresh = await $fetch(
            `${strapiBaseUrl}/api/auth/refresh`,
            {
              method: "POST",
              credentials: "include",
            },
          );

          //@ts-ignore
          auth.setToken(refresh.accessToken);
          //@ts-ignore
          options.headers.Authorization = `Bearer ${refresh.accessToken}`;
          //@ts-ignore
          return $fetch(request, options);
        } catch {
          auth.clear();
          navigateTo("/auth/login");
        }
      }
    },
  });

  return {
    provide: { api },
  };
});
