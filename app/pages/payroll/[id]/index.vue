<template>
  <div>
    <AppBreadcrumb :breadcrumbs="breadcrumbItems" theme="light" class="mb-3" />
    <v-card elevation="0" rounded="lg" class="mt-5">
      <v-toolbar color="transparent">
        <v-toolbar-title><v-icon start>mdi-cash-clock</v-icon> Payroll Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-btn class="my-2 mr-2 text-capitalize" :to="`/payroll/${route.params.id}/print`" variant="elevated"
          elevation="0" prepend-icon="mdi-printer" color="info" target="_blank" rel="noopener noreferrer">Print
          Payroll</v-btn> -->

        <v-btn class="my-2 mr-2 text-capitalize" variant="elevated" elevation="0" prepend-icon="mdi-printer"
          color="info" @click="openPrintWindow">
          Print Payroll
        </v-btn>


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
                  <v-row dense>
                    <v-col cols="7" class="font-weight-bold"> Payroll Cover Start:</v-col>
                    <v-col cols="5"> {{ formatDate(payrollDetails.payroll_period_start)
                      }}</v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12" md="3">
                <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                  <v-row dense>
                    <v-col cols="7" class="font-weight-bold"> Payroll Cover End:</v-col>
                    <v-col cols="5"> {{ formatDate(payrollDetails.payroll_period_end)
                      }}</v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12" md="3">
                <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                  <v-row dense>
                    <v-col cols="7" class="font-weight-bold"> Payroll Created:</v-col>
                    <v-col cols="5"> {{ formatDate(payrollDetails.createdAt)
                      }}</v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12" md="3">
                <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                  <v-row dense>
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
      <v-card-title class="d-flex align-center pe-2">
        Total Net Pay: {{ formatCurrency(totalNetPay) }}
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
          variant="solo-filled" flat hide-details single-line></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table density="compact" :items-per-page="-1" :hide-default-footer="true" :headers="header"
          :items="payrollDetails.payslips" :search="search" :loading="loading">
          <template v-slot:[`item.actions`]="{ item }">
            <!-- <v-btn size="small" class="mr-1" icon="mdi-account-cog-outline" variant="tonal" color="blue"
              :to="`/employees/${item.documentId}`"></v-btn> -->
            <v-btn size="small" class="mr-1" variant="tonal" color="info" @click="openPayrollDialog(item)"><v-icon
                start>mdi-account-cog-outline</v-icon> Manage</v-btn>

          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- <PayslipPrint :payslip="payrollDetails.payslips" /> -->


    <v-dialog v-model="createEmployeePayrollDialog" transition="dialog-bottom-transition" fullscreen scrollable>
      <v-card>
        <v-toolbar>
          <v-btn icon="mdi-close" @click="closeCreateEmployeePayrollDialog"></v-btn>
          <v-toolbar-title>Payroll Enlistment</v-toolbar-title>
          <!-- <v-btn color="primary" variant="flat"><v-icon start>mdi-content-save</v-icon> Save</v-btn> -->
          <v-toolbar-items>
            <v-btn color="warning" variant="flat" @click="resetFormCreateEmployee"><v-icon start>mdi-lock-reset</v-icon>
              Reset</v-btn>
            <v-btn color="primary" variant="flat" @click="submitForm">
              <v-icon start>mdi-content-save</v-icon>
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>

          <h3 class="text-center">Payroll Period</h3>
          <h4 class="text-center">{{ formatDate(payrollDetails.payroll_period_start)
          }} - {{ formatDate(payrollDetails.payroll_period_end)
            }}</h4>


          <!-- <v-row dense class="myh-4">
            <v-col cols="12" md="6">
              <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                <v-row dense>
                  <v-col cols="7" class="font-weight-bold"> Payroll Cover Start:</v-col>
                  <v-col cols="5"> {{ formatDate(payrollDetails.payroll_period_start)
                  }}</v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                <v-row dense>
                  <v-col cols="7" class="font-weight-bold"> Payroll Cover End:</v-col>
                  <v-col cols="5"> {{ formatDate(payrollDetails.payroll_period_end)
                  }}</v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row> -->
          <v-divider class="my-4"></v-divider>
          <v-form ref="payrollEnlistmentForm" v-model="formValid" lazy-validation>

            <v-row dense>


              <v-col cols="6" class="ml-4">

                <p class="font-weight-bold mb-4"><v-icon start>mdi-account</v-icon> Employee Information</p>

                <v-row no-gutters>
                  <v-col cols="3" class="font-weight-bold">Employee Name</v-col>
                  <v-col cols="1">:</v-col>
                  <v-col cols="6">{{ employeeName }}</v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="3" class="font-weight-bold">Position</v-col>
                  <v-col cols="1">:</v-col>
                  <v-col cols="6">{{ position }}</v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="3" class="font-weight-bold">Department</v-col>
                  <v-col cols="1">:</v-col>
                  <v-col cols="6">{{ department }}</v-col>
                </v-row>
                <v-divider class="my-4"></v-divider>
                <p class="font-weight-bold mb-3 mt-5"><v-icon start>mdi-credit-card-outline</v-icon> Salary Information
                </p>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-row no-gutters>
                      <v-col cols="5">Basic Pay</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(basicPay) }}</v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Honorarium</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(honorarium) }}</v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Premium</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(premium) }}</v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Amount Per Unit</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(amountPerUnit) }}</v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-row no-gutters>
                      <v-col cols="5">No. of Units</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ noOfUnits }}</v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Units Total Amount</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(unitsTotalAmount) }}</v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Overtime</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(overtime) }}</v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Late</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(late) }}</v-col>
                    </v-row>
                  </v-col>
                </v-row>


                <v-divider class="mt-2"></v-divider>
                <v-row no-gutters class="my-2">
                  <v-col cols="3" class="font-weight-bold">Gross Pay</v-col>
                  <v-col cols="1">:</v-col>
                  <v-col cols="6" class="font-weight-bold">{{ formatCurrency(grossPay) }}</v-col>
                </v-row>
                <v-divider></v-divider>
                <v-list-subheader class="font-weight-bold mt-2">Premiums</v-list-subheader>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-row no-gutters>
                      <v-col cols="5">SSS</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(sss) }}</v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Philhealth</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(philhealth) }}</v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-row no-gutters>
                      <v-col cols="5">Pag-Ibig</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(pagibig) }}</v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Total Premiums</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6" class="font-weight-bold">{{ formatCurrency(totalPremiums) }}</v-col>
                    </v-row>
                  </v-col>
                </v-row>



                <v-divider class="mt-2"></v-divider>
                <v-row no-gutters class="my-2">
                  <v-col cols="3" class="font-weight-bold">Net Gross Pay</v-col>
                  <v-col cols="1">:</v-col>
                  <v-col cols="6" class="font-weight-bold">{{ formatCurrency(netGrossPay) }}</v-col>
                </v-row>
                <v-divider></v-divider>

                <v-list-subheader class="font-weight-bold mt-2">Other Deductions</v-list-subheader>
                <v-row>
                  <v-col cols="12" md="6">

                    <v-row no-gutters>
                      <v-col cols="5">W/Hodling Tax</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(withHoldingTax) }}</v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">SSS Loan</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(sssLoan) }}</v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Pag-Ibig Loan</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(pagibigLoan) }}</v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">CA Amount</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(cashAdvanceAmount) }}</v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-row no-gutters>
                      <v-col cols="5">CA Balance</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(cashAdvanceBalance) }}</v-col>
                    </v-row>
                     <!-- <v-row no-gutters>
                      <v-col cols="5">CA New Balance</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(cashAdvanceNewBalance) }}</v-col>
                    </v-row> -->
                    <v-row no-gutters>
                      <v-col cols="5">CA Deduction</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(cashAdvanceDeduction) }}</v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Health Card</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(healthCard) }}</v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="5">Total Other Deductions</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6" class="font-weight-bold">{{ formatCurrency(otherDeductionsTotal) }}</v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <v-divider class="mt-2"></v-divider>
                <v-row no-gutters class="my-2">
                  <v-col cols="3" class="font-weight-bold text-h6">Total Net Pay</v-col>
                  <v-col cols="1">:</v-col>
                  <v-col cols="6" class="font-weight-bold text-h6">{{ formatCurrency(netPay) }}</v-col>
                </v-row>
                <v-divider></v-divider>

              </v-col>
              <v-divider opacity=".8" thickness="3" gradient vertical></v-divider>
              <v-col cols="5" class="ml-4 mt-5">
                <!-- <p class="font-weight-bold mb-4"><v-icon start>mdi-credit-card-outline</v-icon> Salary Information</p>
                <v-divider class="my-4"></v-divider> -->
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-autocomplete v-model="employee" :items="employees" item-title="employee_name"
                      :rules="[rules.general]" variant="solo-filled" flat item-value="documentId"
                      label="Select Employee" return-object required>
                    </v-autocomplete>
                    <!-- <v-autocomplete v-model="employee" :items="employees" item-title="employee_name"
                      variant="solo-filled" flat item-value="documentId" label="Select Employee" return-object>

                    </v-autocomplete> -->
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="4">
                    <v-text-field label="No of Units" variant="solo-filled" flat type="number" v-model="noOfUnits" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Overtime" variant="solo-filled" flat type="number" v-model="overtime" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Lates" variant="solo-filled" flat type="number" v-model="late" />
                  </v-col>
                </v-row>
                <p class="font-weight-bold my-3">Premiums</p>
                <v-row dense>
                  <v-col cols="12" md="4">
                    <v-text-field label="SSS" variant="solo-filled" flat type="number" v-model="sss" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Philhealth" variant="solo-filled" flat type="number" v-model="philhealth" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Pag-Ibig" variant="solo-filled" flat type="number" v-model="pagibig" />
                  </v-col>
                </v-row>
                <p class="font-weight-bold my-3">Other Deductions</p>
                <v-row dense>
                  <v-col cols="12" md="4">
                    <v-text-field label="W/Holding Tax" variant="solo-filled" flat type="number"
                      v-model="withHoldingTax" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="SSS Loan" variant="solo-filled" flat type="number" v-model="sssLoan" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Pag-Ibig Loan" variant="solo-filled" flat type="number"
                      v-model="pagibigLoan" />
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="4">
                    <v-text-field label="Cash Advance Deduction" variant="solo-filled" flat type="number"
                      v-model="cashAdvanceDeduction" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Health Card" variant="solo-filled" flat type="number" v-model="healthCard" />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
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
const search = ref('')
const loading = ref(true)
const payrollEnlistmentForm = ref(null)
const formValid = ref(true)
const employees = ref([])
const payrollDetails = ref({})
const createEmployeePayrollDialog = ref(false)
const payroll_period = route.params.id
const employee = ref(null)
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
const cashAdvanceAmount = ref(0)
const cashAdvanceBalance = ref(0)
const originalCashAdvanceBalance = ref(0)
const cashAdvanceDeduction = ref(0)
const healthCard = ref(0)
//const netPay = ref(0)

const rules = {
  general: (v) => !!v || "This field is required"
}



const openEmployeeDialog = async () => {
  fetchEmployee();
  createEmployeePayrollDialog.value = true
}


const fetchPayroll = async () => {
  const res = await $fetch(`${baseUrl}/api/payroll-periods/${route.params.id}?populate[payslips][populate]=*`, {

  })
  loading.value = false
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

const openPrintWindow = () => {
  const url = `/payroll/${route.params.id}/print`
  const width = 800
  const height = 800

  // Get current screen position (supports multi-monitor)
  const dualScreenLeft = window.screenLeft ?? window.screenX
  const dualScreenTop = window.screenTop ?? window.screenY

  const screenWidth = window.innerWidth ?? document.documentElement.clientWidth
  const screenHeight = window.innerHeight ?? document.documentElement.clientHeight

  // Calculate center position
  const left = (screenWidth - width) / 2 + dualScreenLeft
  const top = (screenHeight - height) / 2 + dualScreenTop

  window.open(url,
    'printWindow',
    `
  width=${width}
  height=${height}
  top-${top}
  left=${left}
  resizabe=yes
  scrollbars=yes`
  )
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

const closeCreateEmployeePayrollDialog = async () => {
  createEmployeePayrollDialog.value = false
  resetFormCreateEmployee()
}

const resetFormCreateEmployee = async () => {
  employee.value = ""
  employeeName.value = ""
  position.value = ""
  department.value = ""
  basicPay.value = 0
  honorarium.value = 0
  premium.value = 0
  amountPerUnit.value = 0
  noOfUnits.value = 0
  unitsTotalAmount.value = 0
  overtime.value = 0
  late.value = 0
  sss.value = 0
  philhealth.value = 0;
  pagibig.value = 0
  withHoldingTax.value = 0
  sssLoan.value = 0
  pagibigLoan.value = 0
  cashAdvanceAmount.value = 0
  cashAdvanceBalance.value = 0
  cashAdvanceDeduction.value = 0
  healthCard.value = 0
}

const submitForm = async () => {
  const isValid = await payrollEnlistmentForm.value?.validate();
  if (isValid.valid) {

    try {
      const payload = {
        data: {
          payroll_period: route.params.id,
          employee: employee.value?.id,
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

      // const cashAdvanceNewBalance = Number(cashAdvanceAmount.value) - Number(cashAdvanceDeduction.value)
      console.log("Submitted: ", payload)
      //console.log("Employee: ", employee.value)

      await $fetch(`${baseUrl}/api/payslips`, {
        method: 'POST',
        body: payload,
      })

      // await $fetch(`${baseUrl}/api/employees/${employee.value?.documentId}`, {
      //   method: 'PUT',
      //   body: {
      //     data: {
      //       cash_advance_balance: cashAdvanceNewBalance
      //     }
      //   }
      // })
      
      console.log("Cash Advance New Balance: ", cashAdvanceBalance.value)
      console.log("Employee:", employee.value?.documentId)

      alert(`Payroll for ${employee.value?.employee_name} successfully created `)
      payrollEnlistmentForm.value?.reset()
      resetFormCreateEmployee()
      createEmployeePayrollDialog.value = false
      fetchPayroll();

    } catch (err) {
      const message = err?.response?._data?.error?.message || "Unknown error";
      console.log("Error message: ", message)
      alert(message)
    }


  }

}


function formatCurrency(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(value)
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
  return Number(withHoldingTax.value) + Number(sssLoan.value) + Number(pagibigLoan.value) + Number(cashAdvanceDeduction.value) + Number(healthCard.value)
})

// const cashAdvanceNewBalance = computed(() => {
//   return Number(cashAdvanceBalance.value) - Number(cashAdvanceDeduction.value)
// })


const computeNewCashAdvanceBalance = (payslip) => {
  const current = Number(payslip.employee?.cashAdvanceBalance || 0)
  const deducted = Number(payslip.cash_advance || 0)

  return Math.max(current - deducted, 0)
}

const netPay = computed(() => {
  return Number(netGrossPay.value) - Number(otherDeductionsTotal.value)
})

const totalNetPay = computed(() => {
  if (!payrollDetails.value?.payslips) return 0

  // return payrollDetails.value.payslips.reduce((sum, row) => {
  //   sum + Number(row.net_pay || 0), 0
  // })
  return payrollDetails.value.payslips.reduce((sum, row) => sum + Number(row.net_pay), 0)
})

onMounted(async () => {
  await fetchPayroll();
  //await fetchPayslips();
})




watch(employee, () => {
  if (employee.value) {
    employeeName.value = employee.value?.employee_name
    position.value = employee.value?.position
    department.value = employee.value?.department
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
  originalCashAdvanceBalance.value = Number(
    employee.value.cash_advance_balance || 0
  )

  cashAdvanceBalance.value = originalCashAdvanceBalance.value
  cashAdvanceDeduction.value = 0;
})

watch(cashAdvanceDeduction, (deduction) => {
  cashAdvanceBalance.value = Math.max(
    originalCashAdvanceBalance.value - Number(deduction || 0), 0
  )
})
</script>

<style></style>