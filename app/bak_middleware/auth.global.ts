export default defineNuxtRouteMiddleware(async (to) => {
const userStore = useMyAuthStore();
const userRole = userStore.user?.role?.name
//console.log("Global middleware")
if (!userStore.user) {
    await userStore.fetchUser();
}
if (!userStore.user && to.path !== "/auth/login") {
    return navigateTo("/auth/login");
}

if (userStore.user && to.path === '/auth/login') {
    return navigateTo("/");
}

if (userRole === 'Admin' && !to.path.startsWith("/admin")) {
    return navigateTo("/admin")
}

const requiredRole = to.meta.requiredRole;
const actualRole = userRole;

//console.log("redirect to pages", userRole)
if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

    if (!allowedRoles.includes(actualRole)) {
        if (actualRole === 'Admin') return navigateTo("/admin");
        if (actualRole === 'Staff') return navigateTo("/");
        return navigateTo("/")
    }
}

})
