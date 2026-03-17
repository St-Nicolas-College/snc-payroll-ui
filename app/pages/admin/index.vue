<template>
  <div class="d-flex align-center justify-center" style="height: 80vh;">
  
    <v-card width="500" elevation="0" rounded="lg">
      <v-card-text>
        <h4>Welcome to Admin Panel</h4>
        <v-btn prepend-icon="mdi-power" class="text-capitalize" color="info" block>Logout</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
const { logout, user } = useAuth()
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'role'],
  role: ['Admin']
})
useHead({
  title: 'Admin',

})


</script>

<style></style>