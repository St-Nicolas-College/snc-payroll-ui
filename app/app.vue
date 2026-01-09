<script setup>
const { isLoading } = useLoader()
</script>
<template>
  <NuxtLayout>
    <AppLoader :show="isLoading" />
    <NuxtPage />
        <NuxtSnackbar />
  </NuxtLayout>
</template>