<template>
  <div>
    <PrintPayrollReport :payslips="payrollDetails.payslips" :payroll="payrollDetails"/>
  </div>
</template>

<script setup>
const token = useCookie('token')
definePageMeta({
  layout: "printing",
});
const baseUrl = useRuntimeConfig().public.strapiUrl
const route = useRoute();
const payrollDetails = ref({})

// Fetch payslip from Strapi
const fetchPayroll = async () => {
  const res = await $fetch(`${baseUrl}/api/payroll-periods/${route.params.id}?populate[payslips][populate]=*`, {
    headers: {
              Authorization: `Bearer ${token.value}`
            },
  })
  payrollDetails.value = res.data;
}

onMounted(async () => {
  await fetchPayroll()
})
</script>

<style>

</style>