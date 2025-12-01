<template>
  <div>
    <AppBreadcrumb :breadcrumbs="breadcrumbItems" theme="light" class="mb-3" />
    <v-card elevation="0" rounded="lg" class="mt-5">
      <v-toolbar color="transparent">
        <v-toolbar-title><v-icon start>mdi-cash-clock</v-icon> Payroll Details </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="my-2 text-capitalize" variant="elevated" elevation="0" prepend-icon="mdi-plus" color="primary"
          :to="`/payroll/${route.params.id}/create`">Add Payroll</v-btn>
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
        <v-data-table density="compact" :headers="header" :items="employees" :search="search" :loading="loading">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn size="small" class="mr-1" icon="mdi-account-cog-outline" variant="tonal" color="blue"
              :to="`/employees/${item.documentId}`"></v-btn>
            <v-btn size="small" class="mr-1" icon="mdi-account-cog-outline" variant="tonal" color="primary"
              @click="openPayrollDialog(item)"></v-btn>
            <v-btn size="small" variant="tonal" color="red" @click="deleteItem(item.documentId)">
              <v-icon>mdi-delete</v-icon> Delete
            </v-btn>
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
              <v-text-field label="Payroll Period ID" v-model="form.payroll_period" />
            </v-col>

            <v-col cols="12">
              <!-- <v-text-field label="Employee ID" v-model="form.employee" /> -->
              <!-- <v-select v-model="form.employee" :items="employees" item-title="employee_name" item-value="documentId" label="Employee ID" return-object></v-select> -->
              <v-autocomplete v-model="employee" :items="employees" item-title="employee_name" item-value="documentId"
                label="Employee ID" return-object>

              </v-autocomplete>
              
            </v-col>

            <v-divider class="my-2" />

            <!-- <v-col cols="3" v-for="field in [
              'basic_pay', 'honorarium', 'premium', 'extra_loads',
              'overtime', 'late_deduction'
            ]" :key="field">
              <v-text-field type="number" :label="field" v-model.number="form[field]" />
            </v-col> -->

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
              <v-text-field label="Overtime" type="number" v-model="overtime" />
            </v-col>
             <v-col cols="3">
              <v-text-field label="Late" type="number" v-model="late" />
            </v-col>

            <v-col cols="12">
              <v-text-field label="Gross Pay" v-model="grossPay" readonly />
            </v-col>

            <v-divider class="my-2" />

            <v-col cols="3" v-for="field in ['sss', 'philhealth', 'pagibig']" :key="field">
              <v-text-field type="number" :label="field" v-model.number="form[field]" />
            </v-col>

            <v-col cols="12">
              <v-text-field label="Net Gross Pay" v-model="form.net_gross_pay" readonly />
            </v-col>

            <v-divider class="my-2" />

            <v-col cols="3" v-for="field in [
              'withholding_tax', 'sss_loan', 'pagibig_loan', 'cash_advance', 'health_card'
            ]" :key="field">
              <v-text-field type="number" :label="field" v-model.number="form[field]" />
            </v-col>

            <v-col cols="12">
              <v-text-field label="Net Pay" v-model="form.net_pay" readonly />
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
  { title: 'Payroll Period', key: 'name' },
  { title: 'ID No', key: 'department.name', sortable: false },
  { title: 'Employee Name', key: 'account_type', sortable: false },
  { title: 'Basic Pay', key: 'status', sortable: false },
  { title: 'Honorarium', key: 'lastLogin', sortable: false },
  { title: 'Premium', key: 'lastLogin', sortable: false },
  { title: 'Extra Loads', key: 'lastLogin', sortable: false },
  { title: 'Overtime', key: 'lastLogin', sortable: false },
  { title: 'Late', key: 'lastLogin', sortable: false },
  { title: 'Gross Pay', key: 'lastLogin', sortable: false },
  { title: 'SSS', key: 'lastLogin', sortable: false },
  { title: 'Philhealth', key: 'lastLogin', sortable: false },
  { title: 'Pag-Ibig', key: 'lastLogin', sortable: false },
  { title: 'Net Gross Pay', key: 'lastLogin', sortable: false },
  { title: 'W/Holding Tax', key: 'lastLogin', sortable: false },
  { title: 'SSS Loan', key: 'lastLogin', sortable: false },
  { title: 'Pag-Ibig Loan', key: 'lastLogin', sortable: false },
  { title: 'Cash Advance', key: 'lastLogin', sortable: false },
  { title: 'Health Card', key: 'lastLogin', sortable: false },
  { title: 'Net Pay', key: 'lastLogin', sortable: false },

  // { title: 'Employee No', key: 'employee_no', sortable: false },
  // { title: 'Name', key: 'employee_name', sortable: false },
  // { title: 'Position', key: 'position', sortable: false },
  // { title: 'Department', key: 'department', sortable: false },
  // { title: 'Rate per day', key: 'rate_per_day', sortable: false },
  // { title: 'Rate per hour', key: 'rate_per_hour', sortable: false },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
];

const employees = ref([])
const employee_id = ref('')
const form = ref({
  payroll_period: route.params.id,
  employee: employee_id,
  basic_pay: 0,
  honorarium: 0,
  premium: 0,
  extra_loads: 0,
  overtime: 0,
  late_deduction: 0,
  sss: 0,
  philhealth: 0,
  pagibig: 0,
  withholding_tax: 0,
  sss_loan: 0,
  pagibig_loan: 0,
  cash_advance: 0,
  health_card: 0
})
const payrollDetails = ref({})
const createEmployeePayrollDialog = ref(false)
const employee = ref("")
const basicPay = ref(0)
const honorarium = ref(0)
const premium = ref(0)
const amountPerUnit = ref(0)
const sss = ref(0)
const philhealth = ref(0)
const pagibig = ref(0)
const cashAdvanceAmount = ref(0)
const cashAdvanceBalance = ref(0)
const grossPay = ref(0)


const openEmployeeDialog = async () => {
  fetchEmployee();
  createEmployeePayrollDialog.value = true
}


const fetchPayroll = async () => {
  const res = await $fetch(`${baseUrl}/api/payroll-periods/${route.params.id}`, {
    params: {
      'populate': '*'
    }
  })
  payrollDetails.value = res.data;
  console.log('Payroll Details:', res.data)
}

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
    payroll_period: form.value?.payroll_period,
    employee: form.value?.employee.documentId
  }

  console.log("Submitted: ", payload)
}

const computeValues = () => {
  grossPay.value = basicPay.value + honorarium.value + premium.value + unitsTotalAmount.value + overtime.value - late.value
}

onMounted(async () => {
  await fetchPayroll();
})

// watch([employee] , async () => {
//   if (employee.value) {
//     basicPay.value = employee.value?.basic_pay;
//     honorarium.value = employee.value?.honorarium

//   }
// })

watch(employee, () => { 
    if (employee.value) {
    basicPay.value = employee.value?.basic_pay;
    honorarium.value = employee.value?.honorarium
  }
  
  })
</script>

<style></style>