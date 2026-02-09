export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore();

  const api = $fetch.create({
    baseURL: "http://localhost:1337/api",
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
            "http://localhost:1337/api/auth/refresh",
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
          navigateTo("/login");
        }
      }
    },
  });

  return {
    provide: { api },
  };
});
