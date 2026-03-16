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
  middleware: ['auth', 'role'],
  //requiresAuth: true,
  role: ['Admin', 'Manager', 'Staff']
})
</script>

<style>

</style>