<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" :rail="rail" permanent color="">
      <!-- <v-list>
        <v-list-item prepend-avatar="/SNC-Logo.png" title="Admin">

        </v-list-item>
      </v-list> -->
      <div class="d-flex align-center justify-center my-3">
        <v-img src="/SNC-Logo.png" max-height="40" contain></v-img>
      </div>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-tooltip text="Dashboard" location="right">
          <template #activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-view-dashboard" title="Dashboard" to="/admin"
              active-class="v-list-item--active-custom"></v-list-item>
          </template>
        </v-tooltip>
        <v-tooltip text="Home Page" location="right">
          <template #activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-home-city" title="Home" to="/"
              active-class="v-list-item--active-custom"></v-list-item>
          </template>
        </v-tooltip>
        <v-tooltip text="Settings" location="right">
          <template #activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-cog" title="Settings" value="account"
              active-class="v-list-item--active-custom"></v-list-item>
          </template>
        </v-tooltip>
      </v-list>
      <template v-slot:append>
        <v-list density="compact" nav>
          <v-tooltip text="Logout" location="right">
            <template #activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-power" title="Home" @click="logout"
                class="v-list-item--logout"></v-list-item>
            </template>
          </v-tooltip>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar color="blue" elevation="0">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Admin Panel</v-app-bar-title>
      <v-spacer></v-spacer>
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
            <v-avatar size="40">
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
      </v-menu>
    </v-app-bar>


    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useTheme } from "vuetify";
const { logout, user } = useAuth()
const drawer = ref(true)
const rail = ref(true)
const theme = useTheme();
theme.change('light')

const userInitial = ref(user.value?.user_info?.first_name.substring(0, 1) + user.value?.user_info?.last_name.substring(0, 1))
function toggleTheme() {
  // theme.global.name.value =
  //   theme.global.name.value === "light" ? "dark" : "light";
  const isDark = theme.global.current.value.dark
  theme.change(isDark ? 'light' : 'dark')
}
</script>

<style scoped>
.v-list-item--active-custom {
  color: #4caf50;
  border-radius: 8px;
}

.v-list-item--logout {
  color: #F44336;
  border-radius: 8px;
}
</style>