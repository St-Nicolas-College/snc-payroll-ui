export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  const res: any = await $fetch("/api/auth/login", {
    baseURL: config.public.strapiUrl,
    method: "POST",
    body: {
      identifier: body.email,
      password: body.password,
    },
  });

  setCookie(event, "refreshToken", res.refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return {
    jwt: res.jwt,
    user: res.user,
  };
});
