<template>
  <ClientOnly >
    

  <v-sheet class="d-flex align-center pa-4 rounded-lg elevation-0 overflow-x-auto" :class="{ 'pa-2': mobile }"
    :color="theme === 'dark' ? 'green-darken-2' : 'white'" width="100%" style="white-space: nowrap;">
    <template v-for="(item, index) in breadcrumbs" :key="index">

      <!-- Avatar (Home icon) -->
      <v-avatar v-if="index === 0 && item.icon" :size="mobile ? 28 : 36" class="me-2 flex-shrink-0"
        :color="theme === 'dark' ? 'white' : 'green-lighten-5'">
        <v-icon :icon="item.icon" :size="mobile ? 18 : 24" :color="theme === 'dark' ? 'green-darken-2' : 'green'" />
      </v-avatar>

      <!-- Button / Text -->
      <v-btn v-if="item.to" :to="item.to" variant="text" class="text-capitalize flex-shrink-0"
        :class="theme === 'dark' ? 'text-white' : 'text-green-darken-2'" :size="mobile ? 'small' : 'default'">
        {{ item.text }}
      </v-btn>

      <span v-else class="font-weight-medium text-capitalize flex-shrink-0"
        :class="theme === 'dark' ? 'text-white' : 'text-green-darken-1'"
        :style="{ fontSize: mobile ? '13px' : '16px' }">
        {{ item.text }}
      </span>

      <!-- Chevron Divider -->
      <v-icon v-if="index < breadcrumbs.length - 1" icon="mdi-chevron-right" :size="mobile ? 14 : 20"
        class="mx-2 flex-shrink-0" :class="theme === 'dark' ? 'text-white' : 'text-grey-darken-1'" />
    </template>
  </v-sheet>
  </ClientOnly>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
defineProps({
  breadcrumbs: {
    type: Array,
    required: true
  },
  theme: {
    type: String,
    default: 'light' // "light" or "dark"
  }
})
</script>

<style></style>