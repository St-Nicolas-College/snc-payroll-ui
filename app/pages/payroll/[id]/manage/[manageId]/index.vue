<template>
  <div>
    <AppBreadcrumb :breadcrumbs="breadcrumbItems" theme="light" class="mb-3" />
    <!-- <h1>Manage Payroll Details</h1> -->

    <!-- {{ payrollId }}
    <br>
    {{ manageId }} -->

    <!-- {{ payslipDetails.employee }} -->

    <v-row>
      <v-col cols="12" md="3">
        <v-card elevation="0" rounded="lg">
          <v-card-title class="font-weight-bold text-subtitle-1">
            <v-icon start>mdi-account</v-icon> Employee Information
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <!-- <p class="font-weight-bold mb-4"><v-icon start>mdi-account</v-icon> Employee Information</p> -->


            <v-row dense>
              <v-col cols="5" class="font-weight-bold">Employee Name</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ employee.employee_name }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="5" class="font-weight-bold">Position</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ employee.position }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="5" class="font-weight-bold">Department</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ employee.department }}
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="red" variant="flat" class="my-3" rounded="lg" prepend-icon="mdi-delete"
              @click="deletePayslipDialog = true" block> Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-card elevation="0" class="py-5" rounded="lg">

          <h3 class="text-center">Payroll Period</h3>
          <h4 class="text-center">{{ formatDate(payrollPeriod.payroll_period_start)
          }} - {{ formatDate(payrollPeriod.payroll_period_end)
            }}</h4>
          <v-divider class="mt-5"></v-divider>
          <v-card-text>
            <v-row dense>
              <v-col cols="12" class="px-4">
                <p class="font-weight-bold mb-3 "><v-icon start>mdi-credit-card-outline</v-icon> Salary
                  Information
                </p>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-row no-gutters>
                      <v-col cols="5">Basic Pay</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.basic_pay) }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Honorarium</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.honorarium) }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Premium</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.premium) }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Amount Per Unit</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.amount_per_unit) }}
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-row no-gutters>
                      <v-col cols="5">No. of Units</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ payslipDetails.no_of_units }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Units Total Amount</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.units_total_amount) }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Overtime</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.overtime) }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Late</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.late_deduction) }}
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>


                <v-divider class="mt-2"></v-divider>
                <v-row no-gutters class="my-2">
                  <v-col cols="3" class="font-weight-bold">Gross Pay</v-col>
                  <v-col cols="1">:</v-col>
                  <v-col cols="6" class="font-weight-bold">
                    {{ formatCurrency(payslipDetails.gross_pay) }}
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-list-subheader class="font-weight-bold mt-2">Premiums</v-list-subheader>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-row no-gutters>
                      <v-col cols="5">SSS</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.sss) }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Philhealth</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.philhealth) }}
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-row no-gutters>
                      <v-col cols="5">Pag-Ibig</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.pagibig) }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Total Premiums</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6" class="font-weight-bold">
                        {{ formatCurrency(totalPremiums) }}
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>



                <v-divider class="mt-2"></v-divider>
                <v-row no-gutters class="my-2">
                  <v-col cols="3" class="font-weight-bold">Net Gross Pay</v-col>
                  <v-col cols="1">:</v-col>
                  <v-col cols="6" class="font-weight-bold">
                    {{ formatCurrency(payslipDetails.net_gross_pay) }}
                  </v-col>
                </v-row>
                <v-divider></v-divider>

                <v-list-subheader class="font-weight-bold mt-2">Other Deductions</v-list-subheader>
                <v-row>
                  <v-col cols="12" md="6">

                    <v-row no-gutters>
                      <v-col cols="5">W/Hodling Tax</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.withholding_tax) }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">SSS Loan</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.sss_loan) }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Pag-Ibig Loan</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.pagibig_loan) }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">CA Amount</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.cash_advance_amount) }}
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-row no-gutters>
                      <v-col cols="5">CA Balance</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.cash_advance_balance) }}
                      </v-col>
                    </v-row>
                    <!-- <v-row no-gutters>
                      <v-col cols="5">CA New Balance</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(cashAdvanceNewBalance) }}</v-col>
                    </v-row> -->
                    <v-row no-gutters>
                      <v-col cols="5">CA Deduction</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.cash_advance_deduction) }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Health Card</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">
                        {{ formatCurrency(payslipDetails.health_card) }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Total Other Deductions</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6" class="font-weight-bold">
                        {{ formatCurrency(otherDeductionsTotal) }}

                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <v-divider class="mt-2"></v-divider>
                <v-row no-gutters class="my-2">
                  <v-col cols="3" class="font-weight-bold text-h6">Total Net Pay</v-col>
                  <v-col cols="1">:</v-col>
                  <v-col cols="6" class="font-weight-bold text-h6">
                    {{ formatCurrency(payslipDetails.net_pay) }}
                  </v-col>
                </v-row>
                <v-divider></v-divider>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="deletePayslipDialog" max-width="420" transition="dialog-bottom-transition" persistent>
      <v-card class="rounded-xl elevation-12 overflow-hidden">
        <!-- ✅ Gradient Header -->
        <div class="dialog-header text-center d-flex align-center pa-2">
          <v-icon icon="mdi-alert-outline" size="20" class="mr-3 text-white" />
          <span class="text-white font-weight-medium">
            Confirm
          </span>
        </div>

        <!-- Message -->
        <v-card-text class="py-5 text-center text-grey-darken-3">

          <v-icon icon="mdi-alert-outline" size="60" color="warning" />
          <p class="mt-2 text-body-1">Are you sure you want to delete
            <!-- <strong>{{ selectedCategory.name }}</strong>? -->
          </p>
        </v-card-text>

        <!-- Actions (optional manual close) -->
        <v-card-actions class="pb-5">
          <v-spacer />
          <v-btn variant="tonal" rounded="lg" class="px-6 " @click="deletePayslipDialog = false">
            Cancel
          </v-btn>
          <v-btn color="warning" variant="flat" rounded="lg" class="px-6 text-white" :loading="deleting"
            @click="deletePayslipDetails">
            Delete
          </v-btn>

          <v-spacer />
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>
</template>

<script setup>
const baseUrl = useRuntimeConfig().public.strapiUrl
const route = useRoute();
const payrollId = route.params.id
const manageId = route.params.manageId
const payslipDetails = ref({})
const payrollPeriod = ref({})
const employee = ref({})
const breadcrumbItems = [
  { text: 'Dashboard', to: '/', icon: 'mdi-home-outline' },
  { text: 'Payroll Management', to: '/payroll' },
  { text: 'Details', to: `/payroll/${payrollId}` },
  { text: 'Manage' },
];
const formValid = ref(true)
const employeeName = ref('')
const position = ref("")
const department = ref("")
const basicPay = ref(0)
const honorarium = ref(0)
const premium = ref(0)
const amountPerUnit = ref(0)
const noOfUnits = ref(0);
//const unitsTotalAmount = ref(0)
const overtime = ref(0)
const late = ref(0)
//const grossPay = ref(0)
const sss = ref(0)
const philhealth = ref(0)
const pagibig = ref(0)
// const netGrossPay = ref(0)
const withHoldingTax = ref(0)
const sssLoan = ref(0)
const pagibigLoan = ref(0)
const showCashAdvanceDeduction = ref(false)
const cashAdvanceList = ref([])
const cashAdvance = ref(null)
const selectedCashAdvanceId = ref(null);
const cashAdvanceAmount = ref(0)
const cashAdvanceBalance = ref(0)
const originalCashAdvanceBalance = ref(0)
const cashAdvanceDeduction = ref(0)
const healthCard = ref(0)

const deletePayslipDialog = ref(false)

const rules = {
  general: (v) => !!v || "This field is required"
}



const fetchPayslipDetails = async () => {
  const res = await $fetch(`${baseUrl}/api/payslips/${manageId}?populate=*`)
  // loading.value = false
  // payrollDetails.value = res.data;
  // noRecordFound.value = false
  payslipDetails.value = res.data
  payrollPeriod.value = res.data.payroll_period
  employee.value = res.data.employee
  console.log('Payslip Details:', res.data)
}

const deletePayslipDetails = async () => {
  const cashAdvanceId = payslipDetails.value?.cash_advance_payment?.documentId
  const deletedId = {
    payslipId: manageId,
    cash_advance_payment: cashAdvanceId
  }

  try {
    const [payslip, cashAdvance] = await Promise.all([
      $fetch(`${baseUrl}/api/payslips/${manageId}`, {
        method: 'DELETE'
      }),

      $fetch(`${baseUrl}/api/cash-advance-payments/${cashAdvanceId}`, {
        method: 'DELETE'
      })
    ])
    
    console.log('Payslip deleted..', payslip);
    console.log('Cash advance payment deteled..', cashAdvance)
    console.log('Payslip record deleted successfully')
    deletePayslipDialog.value = false
    navigateTo(`/payroll/${payrollId}`)
  } catch (err) {

  }
  console.log(deletedId)
  //const res = await $fetch(`${baseUrl}/api/payslips/${manageId}`)

  //const res2 = await $fetch(`${baseUrl}/api/cash-advance-payments/${cashAdvanceId}`)
}


// Format the date created
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function formatCurrency(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(value)
}

// const unitsTotalAmount = computed(() => {
//   return (Number(amountPerUnit.value) || 0) * (Number(noOfUnits.value) || 0)
// })

// const grossPay = computed(() => {
//   return Number(basicPay.value) + Number(honorarium.value) + Number(premium.value) + Number(unitsTotalAmount.value) + Number(overtime.value) - Number(late.value)
// })

const totalPremiums = computed(() => {
  return Number(payslipDetails.value.sss) + Number(payslipDetails.value.philhealth) + Number(payslipDetails.value.pagibig)
})
// const netGrossPay = computed(() => {
//   return Number(grossPay.value) - Number(totalPremiums.value)
// })

const otherDeductionsTotal = computed(() => {
  return Number([payslipDetails.value.withholding_tax]) + Number(payslipDetails.value.sss_loan) + Number(payslipDetails.value.pagibig_loan) + Number(payslipDetails.value.cash_advance_deduction) + Number(payslipDetails.value.health_card)
})

onMounted(async () => {
  await fetchPayslipDetails();
})
</script>

<style scoped>
.dialog-header {
  /* background: linear-gradient(90deg, #6366f1, #8b5cf6); Default info gradient */
  /* background: linear-gradient(90deg, #16a34a, #22c55e); success */
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
}
</style>