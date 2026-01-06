export default defineNuxtPlugin(async () => {
    const { fetchUser } = useMyAuthStore();
    console.log("Plugin on load")
    await fetchUser()
})
