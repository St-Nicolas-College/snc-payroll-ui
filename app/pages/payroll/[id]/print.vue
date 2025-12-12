<template>
 <!-- You can place the button anywhere you want -->
  <!-- <v-btn color="primary" class="mb-4" @click="downloadPdf">
    Download PDF
  </v-btn> -->

  <!-- Printable area -->
  <div >

    <PayslipPrint :payslips="payrollDetails.payslips" />
  </div>
</template>

<script setup>
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
definePageMeta({
  layout: "printing",
});
const baseUrl = useRuntimeConfig().public.strapiUrl
const route = useRoute();
const payrollDetails = ref({})

// Fetch payslip from Strapi
// const payslip = await $fetch(`${baseUrl}/api/payslips/${id}?populate=*`)
const fetchPayroll = async () => {
  const res = await $fetch(`${baseUrl}/api/payroll-periods/${route.params.id}?populate[payslips][populate]=*`, {

  })
  // loading.value = false
  payrollDetails.value = res.data;
  console.log('Payroll Details:', res.data)
}




onMounted(async () => {
  await fetchPayroll();
})
</script>

<style scoped>

</style>
