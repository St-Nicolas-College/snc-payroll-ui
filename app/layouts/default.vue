<template>
  <v-app>
    <ClientOnly>
      <v-navigation-drawer app class="py-2" v-model="drawer">
        <div class="d-flex align-center justify-center pb-5">
          <v-img src="/SNC-Logo.png" max-height="60" contain></v-img>
        </div>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <!-- <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard" :to="'/'" class="mb-2"
            active-class="v-list-item--active-custom">
          </v-list-item>
          <v-list-item prepend-icon="mdi-cash-sync" title="Payroll" value="payroll" :to="'/payroll'"
            :active="$route.path.startsWith('/payroll')" class="mb-2" active-class="v-list-item--active-custom">
          </v-list-item>
          <v-list-item prepend-icon="mdi-account-group" title="Employees" value="employees" to="/employees"
            active-class="v-list-item--active-custom" :active="$route.path.startsWith('/employees')"></v-list-item> -->

          <v-list-item v-for="link in visibleLinks" :key="link.title" :to="link.to" :prepend-icon="link.icon"
            :title="link.title" active-class="v-list-item--active-custom">

          </v-list-item>
        </v-list>

        <template v-slot:append v-if="drawer">
          <v-divider></v-divider>
          <v-card class="mx-3 pa-2" color="transparent" flat>
            <v-row align="center" dense>
              <v-col cols="auto">
                <v-avatar size="40" color="primary">
                  <span>{{ userInitial }}</span>
                </v-avatar>
              </v-col>
              <v-col class="py-0">
                <div class="font-weight-medium text-body-2">
                  {{ user?.user_info?.first_name }} {{ user?.user_info?.last_name }}
                </div>
                <div class="text-caption text-grey">{{ user?.user_info?.position }}</div>
              </v-col>
              <v-col cols="12">
                <v-btn color="red-darken-3" variant="tonal" block size="small" @click="handleLogout()">
                  <v-icon>mdi-power</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </template>
        <template v-slot:append v-else>
          <v-btn icon flat size="small" class="mx-auto mb-3">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
      </v-navigation-drawer>
    </ClientOnly>

    <!-- APP BAR FOR WEB VIEW -->
    <v-app-bar app flat class="border-b " :color="smAndDown ? 'green' : ''">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="align-center">
        <span class="font-weight-bold mr-2">SNC Payroll System</span>
        <!-- <v-chip color="primary" size="small" variant="elevated">New</v-chip> -->
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-btn icon class="ml-2" @click="toggleTheme">
        <v-icon>{{
          theme.global.current.value.dark
            ? "mdi-weather-sunny"
            : "mdi-weather-night"
        }}</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" class="ml-2">
            <v-avatar size="40" color="primary">
              <span>{{ userInitial }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </v-app-bar>

    

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <v-bottom-navigation
      v-model="value"
      color="primary"
      class="d-flex d-sm-none"
      active
    >
      <v-btn to="/">
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn>

      <v-btn to="/payroll">
        <v-icon>mdi-cash-sync</v-icon>

        Payroll
      </v-btn>

      <v-btn to="/employees">
        <v-icon>mdi-account-supervisor</v-icon>

        <span>Employees</span>
      </v-btn>

      <v-btn to="/account-settings">
        <v-icon>mdi-cog</v-icon>

        <span>Settings</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup>
import { useTheme } from "vuetify";
import { useDisplay } from "vuetify/lib/composables/display.mjs";
const { smAndDown } = useDisplay()
const { logUserOut } = useMyAuthStore()
const { user } = storeToRefs(useMyAuthStore())
const userStore = useMyAuthStore();
const links = [
  {
    title: "Dashboard",
    to: '/',
    icon: "mdi-view-dashboard",
    roles: ["Staff"]
  },
  {
    title: "Payroll",
    to: '/payroll',
    icon: "mdi-cash-sync",
    roles: ["Staff"]
  },
  {
    title: "Employees",
    to: '/employees',
    icon: "mdi-account-group",
    roles: ["Staff"]
  }
]

const drawer = ref(true);
const { mobile } = useDisplay()
const theme = useTheme();
//theme.global.name.value = "light";
theme.change('light')


const visibleLinks = computed(() => {
  return links.filter((link) => link.roles.includes(userStore.role))
})

const userInitial = ref(user.value.user_info?.first_name.substring(0, 1) + user.value.user_info?.last_name.substring(0, 1))

// Function to toggle between dark and light themes
function toggleTheme() {
  // theme.global.name.value =
  //   theme.global.name.value === "light" ? "dark" : "light";
  const isDark = theme.global.current.value.dark
  theme.change(isDark ? 'light' : 'dark')
}

const handleLogout = () => {
  logUserOut();
  //router.push("/auth/login")
  window.location.href = "/auth/login";
};

watch(mobile, (isMobile) => {
  drawer.value = !isMobile;
},
  {
    immediate: true
  }
)
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

body {
  font-family: "Inter", sans-serif;
}

.v-list-item--active-custom {
  color: #4caf50;
  border-radius: 8px;
}
</style>