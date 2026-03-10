export default defineNuxtPlugin(async (nuxtApp) => {
  const { refresh, authReady } = useAuth();
  const token = useState<any>("token");
  try {
    const res: any = await $fetch("/api/refresh", {
      method: "POST",
    });
    console.log("Auth ready");
    authReady.value = true;
    token.value = res.jwt;
  } catch (err) {
    console.log("Auth ready 2");

    token.value = null;
  }
  authReady.value = true;
});
