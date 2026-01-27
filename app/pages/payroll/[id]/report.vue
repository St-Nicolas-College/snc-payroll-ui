<template>
  <div>
    <PrintPayrollReport :payslips="payrollDetails.payslips" :payroll="payrollDetails" :mode="route.query.mode" />

    <!-- {{ route.query.mode }} -->
  </div>
</template>

<script setup>
import qs from 'qs';
const token = useCookie('token')
definePageMeta({
  layout: "printing",
});
const baseUrl = useRuntimeConfig().public.strapiUrl
const route = useRoute();
const payrollDetails = ref({})

// Fetch payslip from Strapi
const fetchPayroll = async () => {
  const query = qs.stringify({
    populate: {
      payslips: {
        filters: {
          mode: {
            $eq: route.query.mode
          }
        },
        populate: '*'
      }
    }
  })
  // const res = await $fetch(`${baseUrl}/api/payroll-periods/${route.params.id}?populate[payslips][populate]=*`, {
  //   headers: {
  //     Authorization: `Bearer ${token.value}`
  //   },
  // })
  const res = await $fetch(`${baseUrl}/api/payroll-periods/${route.params.id}?${query}`, {
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

<style></style>