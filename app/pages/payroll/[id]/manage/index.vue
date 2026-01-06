<template>
  <div>
    <AppBreadcrumb :breadcrumbs="breadcrumbItems" theme="light" class="mb-3" />
    <h1>Manage Payroll Details</h1>
  </div>
</template>

<script setup>
  useHead({
  title: 'Manage',

})
const breadcrumbItems = [
  { text: 'Dashboard', to: '/', icon: 'mdi-home-outline' },
  { text: 'Payroll Management', to: '/payroll' },
  { text: 'Details' },
];
</script>

<style>

</style>