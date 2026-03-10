<template>
  <div class="mx-auto d-flex align-center justify-center" style="height: 90vh;">
    <!-- <v-card rounded="xl" elevation="0">
      <v-card-text class="text-center">
        <p class="error-403">403</p>
        <p class="error-title">Forbidden Error</p>
        <p class="error-message mt-3">We are sorry, but you do not have access to this page or resource</p>
        <v-btn class="text-capitalize mt-8" color="blue" rounded="lg" flat to="/">Go to home page</v-btn>
      </v-card-text>
    </v-card> -->

    <v-empty-state image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg"
      text="We are sorry, but you do not have access to this page or resource" headline="403 - Forbidden">
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn to="/" color="blue" text="Go to home page"></v-btn>
        <v-spacer></v-spacer>
      </template>
    </v-empty-state>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'error',
  //requiredRole: 'Admin',
})

</script>

<style scoped>
.error-403 {
  font-size: 19vh;
  font-weight: bold;
  color: #4CAF50
}

.error-title {
  font-size: 4vh;
  font-weight: bold;
}

.error-message {
  font-size: 16px;
  color: #9E9E9E;
}
</style>