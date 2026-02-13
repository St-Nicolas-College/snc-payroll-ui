import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ 
    accessToken: null as string | null,
    user: null as any,
    isRefreshing: false,
    isReady: false
  }),
  getters: {
    isLoggedIn: (state) => !!state.accessToken && !!state.user,
    role: (state) => state.user?.role?.name || null,
    userInfo: (state) => state.user?.user_info,
    hasRole: (state) => (roles: string[] | string) => {
      if (!state.user) return false
      if (typeof roles === 'string') return state.user.role?.name === roles
      return roles.includes(state.user.role?.name)
    },
  },
  actions: {
    setAuth(token: string, user: any) {
      this.accessToken = token;
      this.user = user;
    },
    // setToken(token: string) {
    //   this.accessToken = token;
    // },
    clear() {
      this.accessToken = null;
      this.user = null;
    },

    // =========================
    // Fetch new access token from refresh token
    // =========================
    async refresh() {
      const baseUrl = useRuntimeConfig().public.strapiUrl;
      if (this.isRefreshing) return
      this.isRefreshing = true
      try {
        // @ts-ignore
        const { accessToken, user } = await $fetch(`${baseUrl}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include'
        })
        this.setAuth(accessToken, user)
      } catch {
        this.clear()
      } finally {
        this.isRefreshing = false
        this.isReady = true
      }
    },
  }
})
