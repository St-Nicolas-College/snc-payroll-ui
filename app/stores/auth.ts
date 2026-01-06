import { defineStore } from "pinia";

interface UserPayloadInterface {
  identifier: String;
  password: String;
}

export const useMyAuthStore = defineStore("myAuthStore", {
  state: () => ({
    authenticated: false,
    loading: false,
    userInfo: {},
    userRole: null as string | null,
    userId: null,
    errorLogin: false,
    errorMessage: "",
    user: null as any,
    token: null as string | null,
    //user: null as null | { username: string; account_type: string },
  }),

  getters: {
    role: (state) => state.user?.role?.name || "guest",
    isAdmin: (state) => state.user?.role?.name === "Admin",
    isStaff: (state) => state.user?.role?.name === "Staff",
    isAuthenticated: (state) => state.authenticated,
  },
  actions: {
    async login({ identifier, password }: UserPayloadInterface) {
      const config = useRuntimeConfig();

      const { data, error }: any = await useFetch(
        `${config.public.strapiUrl}/api/auth/local`,
        {
          method: "POST",
          body: {
            identifier,
            password,
          },
        }
      );

      this.token = data.value?.jwt;

      if (data.value) {
        // Get user info with role
        const me: any = await $fetch(
          `${config.public.strapiUrl}/api/users/me?populate=role`,
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );
        //let userRole = me.role?.name || null;
        this.userRole = me.role?.name || null;
        localStorage.setItem("role", this.userRole || "");
        if (this.userRole !== "Admin" && this.userRole !== "Staff") {
          this.errorLogin = true;
          return error;
        }

        this.userId = data.value?.user?.id;
        const token = useCookie("token");
        token.value = data?.value?.jwt;
        this.authenticated = true;
        this.errorLogin = false;
      } else {
        this.errorLogin = true;
        this.errorMessage = error.value.data.error.message;
      }
    },

    async fetchUser() {
      const baseUrl = useRuntimeConfig().public.strapiUrl;
      const token = useCookie("token");

      this.loading = true;
      this.errorLogin = false;

      if (!token.value) {
        this.user = null;
        this.authenticated = false;
        this.loading = false;
        return;
      }

      try {
        const { data, error } = await useFetch(
          `${baseUrl}/api/users/me?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        );

        if (error.value || !data.value) {
          this.user = null;
          this.authenticated = false;
        } else {
          this.user = data.value;
          this.authenticated = true;
        }
      } catch (err: any) {
        this.user = null;
        this.authenticated = false;
        this.errorLogin = true;
        this.errorMessage = err.message;
      } finally {
        this.loading = false;
      }
    },

    logUserOut() {
      const token = useCookie("token");
      token.value = null;
      this.authenticated = false;
      this.user = null;
      localStorage.clear();
      //this.userInfo = {}
    },
  },
});
