export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = storeToRefs(useMyAuthStore());
    const authStore = useMyAuthStore();

    //console.log("Admin middleware");
    if (!user.value || authStore.userRole !== 'Admin') {
        return navigateTo('/')
    }

    if (authStore.userRole === 'Admin' && to.path === "/") {
        return navigateTo("/admin")
    }
})
