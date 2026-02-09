<template>
  <div>
    <h1>Home Page</h1>

    <v-btn>submit</v-btn>
  </div>
</template>

<script setup>
useHead({
  title: 'Dashboard',

})
definePageMeta({
  //middleware: 'auth',
  requiresAuth: true,
  roles: ['Admin', 'Staff']
})
</script>

<style>

</style>