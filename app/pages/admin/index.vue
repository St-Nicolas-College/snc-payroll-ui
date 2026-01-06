<template>
  <div>
    <h1>Admin Page</h1>
    <v-btn @click="handleLogout">Logout</v-btn>
  </div>
</template>

<script setup>
const { logUserOut } = useMyAuthStore()
definePageMeta({
  layout: 'admin',
  requiredRole: 'Admin',
})
useHead({
  title: 'Admin',

})

const handleLogout = () => {
  logUserOut();
  //router.push("/auth/login")
  window.location.href = "/auth/login";
};
</script>

<style></style>