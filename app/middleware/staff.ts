export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useMyAuthStore();

    if (!authStore.user || authStore.userRole !== 'Staff') {
        return navigateTo("/admin")
    }
})
