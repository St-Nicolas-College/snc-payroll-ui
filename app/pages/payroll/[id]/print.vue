<template>
  <!-- Printable area -->
  <div >
    <PayslipPrint :payslips="payrollDetails.payslips" :payroll="payrollDetails" />
  </div>
</template>

<script setup>
const { $api } = useNuxtApp();
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { includes } from "vuetify/lib/util/helpers.mjs";
const token = useCookie('token')
definePageMeta({
  layout: "printing",
});
const baseUrl = useRuntimeConfig().public.strapiUrl
const route = useRoute();
const payrollDetails = ref({})

// Fetch payslip from Strapi
// const payslip = await $fetch(`${baseUrl}/api/payslips/${id}?populate=*`)
const fetchPayroll = async () => {
  const res = await $api(`/payroll-periods/${route.params.id}?populate[payslips][populate]=*`, {
    credentials: 'include'
  })
  // loading.value = false
  payrollDetails.value = res.data;
  //console.log('Payroll Details:', res.data)
}




onMounted(async () => {
  await fetchPayroll();
})
</script>

<style scoped>

</style>
