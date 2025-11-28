export const useStrapiApi = () => {
  const config = useRuntimeConfig()

  const base = config.public.strapiUrl + "/api"
  const token = useCookie("auth_token")

  const headers = token.value
    ? { Authorization: `Bearer ${token.value}` }
    : {}

    // @ts-ignore
  const get = (url, opts = {}) =>
        // @ts-ignore
    $fetch(base + url, { headers, ...opts })
    // @ts-ignore
  const post = (url, data = {}) =>
        // @ts-ignore
    $fetch(base + url, { method: "POST", headers, body: data })

        // @ts-ignore
  const put = (url, data = {}) =>
        // @ts-ignore
    $fetch(base + url, { method: "PUT", headers, body: data })

        // @ts-ignore
  const del = (url) =>
        // @ts-ignore
    $fetch(base + url, { method: "DELETE", headers })

  return { get, post, put, del }
}
