
<template>

  <NuxtLayout>
    <AppLoader :show="isLoading" />

    <NuxtPage />
    <v-snackbar v-model="show" :color="color" variant="tonal" location="bottom right" timeout="3000" content-class="toast-left-border">
      <v-icon start class="mr-2">{{ icon }}</v-icon>
      {{ message }}

      <!-- Close Button -->
      <template #actions>
        <v-btn icon="mdi-close" size="small" variant="text" @click="show = false" />
      </template>
    </v-snackbar>
  </NuxtLayout>

</template>

<script setup>
const { isLoading } = useLoader()
const { show, message, color, icon } = useToast()
</script>
<style>
.toast-left-border {
  border-left: 6px solid currentColor;
}
</style>
