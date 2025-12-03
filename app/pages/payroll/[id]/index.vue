<template>
  <div>
    <AppBreadcrumb :breadcrumbs="breadcrumbItems" theme="light" class="mb-3" />
    <v-card elevation="0" rounded="lg" class="mt-5">
      <v-toolbar color="transparent">
        <v-toolbar-title><v-icon start>mdi-cash-clock</v-icon> Payroll Details </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-btn class="my-2 text-capitalize" variant="elevated" elevation="0" prepend-icon="mdi-plus" color="primary"
          :to="`/payroll/${route.params.id}/create`">Add Payroll</v-btn> -->
        <v-btn class="my-2 text-capitalize" variant="elevated" elevation="0" prepend-icon="mdi-plus" color="primary"
          @click="openEmployeeDialog">Add Employee Payroll</v-btn>

        <!-- <PayrollEmployeePayrollForm @saved="fetchEmployeePayroll"/> -->

      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="12">
            <v-row>
              <v-col cols="12" md="3">
                <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                  <v-row :dense="compact">
                    <v-col cols="7" class="font-weight-bold"> Payroll Cover Start:</v-col>
                    <v-col cols="5"> {{ formatDate(payrollDetails.payroll_period_start)
                      }}</v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12" md="3">
                <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                  <v-row :dense="compact">
                    <v-col cols="7" class="font-weight-bold"> Payroll Cover End:</v-col>
                    <v-col cols="5"> {{ formatDate(payrollDetails.payroll_period_end)
                      }}</v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12" md="3">
                <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                  <v-row :dense="compact">
                    <v-col cols="7" class="font-weight-bold"> Payroll Created:</v-col>
                    <v-col cols="5"> {{ formatDate(payrollDetails.createdAt)
                      }}</v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12" md="3">
                <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                  <v-row :dense="compact">
                    <v-col cols="7" class="font-weight-bold"> Created By:</v-col>
                    <v-col cols="5"> </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card elevation="0" rounded="lg" class="mt-5">
      <v-card-text>
        <v-data-table density="compact" :headers="header" :items="payrollDetails.payslips" :search="search"
          :loading="loading">
          <template v-slot:[`item.actions`]="{ item }">
            <!-- <v-btn size="small" class="mr-1" icon="mdi-account-cog-outline" variant="tonal" color="blue"
              :to="`/employees/${item.documentId}`"></v-btn> -->
            <v-btn size="small" class="mr-1" variant="tonal" color="info" @click="openPayrollDialog(item)"><v-icon
                start>mdi-account-cog-outline</v-icon> Manage</v-btn>

          </template>
        </v-data-table>
      </v-card-text>
    </v-card>


    <v-dialog v-model="createEmployeePayrollDialog" width="1000">
      <v-card>
        <v-toolbar></v-toolbar>
        <v-card-text>

          <v-row dense>
            <v-row>
              <v-col cols="12" md="6">
                <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                  <v-row :dense="compact">
                    <v-col cols="7" class="font-weight-bold"> Payroll Cover Start:</v-col>
                    <v-col cols="5"> {{ formatDate(payrollDetails.payroll_period_start)
                      }}</v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                  <v-row :dense="compact">
                    <v-col cols="7" class="font-weight-bold"> Payroll Cover End:</v-col>
                    <v-col cols="5"> {{ formatDate(payrollDetails.payroll_period_end)
                      }}</v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>

            <v-col cols="12">
              <v-text-field label="Payroll Period ID" v-model="payroll_period" />
            </v-col>

            <v-col cols="12">
              <!-- <v-text-field label="Employee ID" v-model="form.employee" /> -->
              <!-- <v-select v-model="form.employee" :items="employees" item-title="employee_name" item-value="documentId" label="Employee ID" return-object></v-select> -->
              <v-autocomplete v-model="employee" :items="employees" item-title="employee_name" item-value="documentId"
                label="Employee ID" return-object>

              </v-autocomplete>

            </v-col>

            <v-divider class="my-2" />
            <v-col cols="3">
              <v-text-field label="Basic Pay" type="number" v-model="basicPay" />
            </v-col>
            <v-col cols="3">
              <v-text-field label="Honorarium" type="number" v-model="honorarium" />
            </v-col>
            <v-col cols="3">
              <v-text-field label="Premium" type="number" v-model="premium" />
            </v-col>
            <!-- <v-col cols="3">
              <v-text-field label="Honorarium" type="number" v-model="honorarium" />
            </v-col> -->
            <v-col cols="3">
              <v-text-field label="Amount Per Unit" type="number" v-model="amountPerUnit" />
            </v-col>
            <v-col cols="3">
              <v-text-field label="No of Units" type="number" v-model="noOfUnits" />
            </v-col>
            <v-col cols="3">
              <v-text-field label="Units Total Amount" type="number" v-model="unitsTotalAmount" />
            </v-col>
            <v-col cols="3">
              <v-text-field label="Overtime" type="number" v-model.number="overtime" />
            </v-col>
            <v-col cols="3">
              <v-text-field label="Late" type="number" v-model="late" />
            </v-col>

            <v-col cols="12">
              <v-text-field label="Gross Pay" v-model="grossPay" readonly />
            </v-col>

            <v-divider class="my-2" />
            <v-col cols="3">
              <v-text-field type="number" label="SSS" v-model="sss" />
            </v-col>
            <v-col cols="3">
              <v-text-field type="number" label="Philhealth" v-model="philhealth" />
            </v-col>
            <v-col cols="3">
              <v-text-field type="number" label="Pag-Ibig" v-model="pagibig" />
            </v-col>
            <v-col>
              <v-text-field type="number" label="Total Premiums" v-model="totalPremiums"></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field label="Net Gross Pay" v-model="netGrossPay" readonly />
            </v-col>

            <v-divider class="my-2" />

            <v-col cols="3">
              <v-text-field type="number" label="W/Hoding Tax" v-model="withHoldingTax"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field type="number" label="SSS Loan" v-model="sssLoan"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field type="number" label="Pag-Ibig Loan" v-model="pagibigLoan"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field type="number" label="Cash Advance Amount" v-model="cashAdvanceAmount"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field type="number" label="Cash Advance Balance" v-model="cashAdvanceBalance"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field type="number" label="Cash Advance Deduction" v-model="cashAdvanceDeduction"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field type="number" label="Health Card" v-model="healthCard"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field type="number" label="Other Deductions Total" readonly
                v-model="otherDeductionsTotal"></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field label="Net Pay" v-model="netPay" readonly />
            </v-col>

            <v-col cols="12">
              <v-btn color="primary" @click="submitForm">Save Payslip</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
const baseUrl = useRuntimeConfig().public.strapiUrl
const route = useRoute();
const breadcrumbItems = [
  { text: 'Dashboard', to: '/', icon: 'mdi-home-outline' },
  { text: 'Payroll Management', to: '/payroll' },
  { text: 'Details' },
];
const header = [
  // { title: 'Payroll Period', key: 'name' },
  { title: 'ID No', key: 'employee.employee_no', sortable: false },
  { title: 'Employee Name', key: 'employee.employee_name', sortable: false },
  { title: 'Basic Pay', key: 'basic_pay', sortable: false },
  { title: 'Honorarium', key: 'honorarium', sortable: false },
  { title: 'Premium', key: 'premium', sortable: false },
  { title: 'Loads', key: 'units_total_amount', sortable: false },
  { title: 'Overtime', key: 'overtime', sortable: false },
  { title: 'Late', key: 'late_deduction', sortable: false },
  { title: 'Gross Pay', key: 'gross_pay', sortable: false },
  { title: 'SSS', key: 'sss', sortable: false },
  { title: 'Philhealth', key: 'philhealth', sortable: false },
  { title: 'Pag-Ibig', key: 'pagibig', sortable: false },
  { title: 'Net Gross Pay', key: 'net_gross_pay', sortable: false },
  { title: 'W/Holding Tax', key: 'withholding_tax', sortable: false },
  { title: 'SSS Loan', key: 'sss_loan', sortable: false },
  { title: 'Pag-Ibig Loan', key: 'pagibig_loan', sortable: false },
  { title: 'Cash Advance', key: 'cash_advance_deduction', sortable: false },
  { title: 'Health Card', key: 'health_card', sortable: false },
  { title: 'Net Pay', key: 'net_pay', sortable: false },

  // { title: 'Employee No', key: 'employee_no', sortable: false },
  // { title: 'Name', key: 'employee_name', sortable: false },
  // { title: 'Position', key: 'position', sortable: false },
  // { title: 'Department', key: 'department', sortable: false },
  // { title: 'Rate per day', key: 'rate_per_day', sortable: false },
  // { title: 'Rate per hour', key: 'rate_per_hour', sortable: false },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
];

const employees = ref([])
const payrollDetails = ref({})
const createEmployeePayrollDialog = ref(false)
const payroll_period = route.params.id
const employee = ref("")
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
const cashAdvanceAmount = ref(0)
const cashAdvanceBalance = ref(0)
const cashAdvanceDeduction = ref(0)
const healthCard = ref(0)
//const netPay = ref(0)



const openEmployeeDialog = async () => {
  fetchEmployee();
  createEmployeePayrollDialog.value = true
}


const fetchPayroll = async () => {
  const res = await $fetch(`${baseUrl}/api/payroll-periods/${route.params.id}?populate[payslips][populate]=*`, {

  })
  payrollDetails.value = res.data;
  console.log('Payroll Details:', res.data)
}

// const fetchPayslips = async () => {
//    const res = await $fetch(`${baseUrl}/api/payroll-periods/${route.params.id}?populate[payslips][populate]=*`, {
//   })

//   payrollDetails.value = res.data;
//   console.log('Payroll Details:', res.data)
// }

const fetchEmployee = async () => {
  const res = await $fetch(`${baseUrl}/api/employees`);
  employees.value = res.data
}

// Format the date created
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const fetchEmployeePayroll = async () => {
  console.log("Saved employee payroll")
}

const submitForm = async () => {
  const payload = {
    data: {
      payroll_period: route.params.id,
      employee: employee.value?.documentId,
      basic_pay: basicPay.value,
      honorarium: honorarium.value,
      premium: premium.value,
      amount_per_unit: amountPerUnit.value,
      no_of_units: noOfUnits.value,
      units_total_amount: unitsTotalAmount.value,
      overtime: overtime.value,
      late_deduction: late.value,
      gross_pay: grossPay.value,
      sss: sss.value,
      philhealth: philhealth.value,
      pagibig: pagibig.value,
      net_gross_pay: netGrossPay.value,
      withholding_tax: withHoldingTax.value,
      sss_loan: sssLoan.value,
      pagibig_loan: pagibigLoan.value,
      cash_advance_amount: cashAdvanceAmount.value,
      cash_advance_balance: cashAdvanceBalance.value,
      cash_advance_deduction: cashAdvanceDeduction.value,
      health_card: healthCard.value,
      net_pay: netPay.value
    }
  }
  console.log("Submitted: ", payload)

  await $fetch(`${baseUrl}/api/payslips`, {
    method: 'POST',
    body: payload
  })

  alert(`Payroll for ${employee.value?.employee_name} successfully created `)
  fetchPayroll();
}

// const computeValues = () => {
//   grossPay.value = basicPay.value + honorarium.value + premium.value + unitsTotalAmount.value + overtime.value - late.value
// }

const unitsTotalAmount = computed(() => {
  return (Number(amountPerUnit.value) || 0) * (Number(noOfUnits.value) || 0)
})

const grossPay = computed(() => {
  return Number(basicPay.value) + Number(honorarium.value) + Number(premium.value) + Number(unitsTotalAmount.value) + Number(overtime.value) - Number(late.value)
})

const totalPremiums = computed(() => {
  return Number(sss.value) + Number(philhealth.value) + Number(pagibig.value)
})
const netGrossPay = computed(() => {
  return Number(grossPay.value) - Number(totalPremiums.value)
})

const otherDeductionsTotal = computed(() => {
  return Number(withHoldingTax.value) + Number(sssLoan.value) + Number(pagibigLoan.value) + Number(cashAdvanceDeduction.value)
})

const netPay = computed(() => {
  return Number(netGrossPay.value) - Number(otherDeductionsTotal.value)
})

onMounted(async () => {
  await fetchPayroll();
  //await fetchPayslips();
})



watch(employee, () => {
  if (employee.value) {
    basicPay.value = employee.value?.basic_pay / 2;
    honorarium.value = employee.value?.honorarium / 2
    premium.value = employee.value?.premium / 2
    amountPerUnit.value = employee.value?.amount_per_unit
    sss.value = employee.value?.sss
    philhealth.value = employee.value?.philhealth
    pagibig.value = employee.value?.pagibig
    cashAdvanceAmount.value = employee.value?.cash_advance_amount
    cashAdvanceBalance.value = employee.value?.cash_advance_balance

  }

})
</script>

<style></style>