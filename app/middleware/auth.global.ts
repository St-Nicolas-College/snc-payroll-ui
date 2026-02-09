export default defineNuxtRouteMiddleware(async (to) => {
const auth = useAuthStore()

  // 🛑 WAIT FOR REFRESH FIRST
  if (!auth.isReady) {
    await auth.refresh()
  }

  // 🔐 Protected routes
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return navigateTo('/auth/login')
  }

  // 🚫 Prevent logged-in users from seeing login
  if (to.path === '/auth/login' && auth.isLoggedIn) {
    return navigateTo('/')
  }

  // 🛡 Role-based access
  //@ts-ignore
  if (to.meta.roles && !to.meta.roles.includes(auth.role)) {
    return navigateTo('/unauthorized')
  }
})
