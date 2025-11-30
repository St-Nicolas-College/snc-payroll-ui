<template>
  <div>
    <AppBreadcrumb :breadcrumbs="breadcrumbItems" theme="light" class="mb-3" />
    <v-card elevation="0" rounded="lg" class="mt-5">
      <v-toolbar color="transparent">
        <v-toolbar-title><v-icon start>mdi-account-group</v-icon> Employees Management</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-title class="d-flex align-center">
        <!-- <v-btn class="my-2 text-capitalize" prepend-icon="mdi-plus" color="primary" to="/inventory/create">Add
          Item</v-btn> -->
        <v-btn class="my-2 text-capitalize" elevation="0" prepend-icon="mdi-plus" color="primary"
          @click="createUserDialog = true">Add
          new user</v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
          variant="solo-filled" flat hide-details single-line></v-text-field>

      </v-card-title>
      <v-divider></v-divider>
      <v-data-table density="compact" :headers="header" :items="employees" :search="search" :loading="loading"
        show-select>
        <template v-slot:[`item.actions`]="{ item }">
          <!-- <v-btn size="small" class="mr-1" icon="mdi-account-cog-outline" variant="tonal" color="blue"
            :to="`/employees/${item.documentId}`"></v-btn> -->
          <!-- <v-btn size="small" class="mr-1" icon="mdi-account-cog-outline" variant="tonal" color="primary"
            @click="openPayrollDialog(item)"></v-btn> -->
          <v-btn size="small" class="mr-1" variant="tonal" color="info"
            @click="openPayrollDialog(item)"><v-icon start>mdi-account-cog-outline</v-icon> Manage</v-btn>
          <v-btn size="small" variant="tonal" color="red" @click="deleteItem(item.documentId)">
            <v-icon>mdi-delete</v-icon> Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="createPayrollDialog" width="900">
      <v-card class="pa-4">
        <v-row dense>
          <v-col cols="12">
            <!-- <v-text-field label="Payroll Period" v-model="form.payroll_period" /> -->
            <v-select v-model="form.payroll_period" :items="payroll" item-title="documentId" item-value="id"
              label="Payroll Period" return-object required>
              <template v-slot:item="{ props: itemProps, item }">
                <!-- <v-list-item v-bind="itemProps" :subtitle="item.raw.payroll_period_start"></v-list-item> -->
                <v-list-item v-bind="itemProps">
                  <v-list-item-subtitle>{{ item.raw.payroll_period_start }} - {{ item.raw.payroll_period_end
                  }}</v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-select>
          </v-col>

          <v-col cols="12">
            <v-text-field label="Employee ID" v-model="form.employee" />
          </v-col>

          <v-divider class="my-2" />

          <v-col cols="3" v-for="field in [
            'basic_pay', 'honorarium', 'premium', 'extra_loads',
            'overtime', 'late_deduction'
          ]" :key="field">
            <v-text-field type="number" :label="field" v-model.number="form[field]" />
          </v-col>

          <v-col cols="12">
            <v-text-field label="Gross Pay" v-model="form.gross_pay" readonly />
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
      </v-card>
    </v-dialog>


  </div>
</template>

<script setup>
const baseUrl = useRuntimeConfig().public.strapiUrl
const breadcrumbItems = [
  { text: 'Dashboard', to: '/', icon: 'mdi-home-outline' },
  { text: 'Employee Management' },
]
const header = [
  // { title: 'Payroll Period', key: 'name' },
  // { title: 'ID No', key: 'department.name', sortable: false },
  // { title: 'Employee Name', key: 'account_type', sortable: false },
  // { title: 'Basic Pay', key: 'status', sortable: false },
  // { title: 'Honorarium', key: 'lastLogin', sortable: false },
  // { title: 'Premium', key: 'lastLogin', sortable: false },
  // { title: 'Extra Loads', key: 'lastLogin', sortable: false },
  // { title: 'Overtime', key: 'lastLogin', sortable: false },
  // { title: 'Late', key: 'lastLogin', sortable: false },
  // { title: 'Gross Pay', key: 'lastLogin', sortable: false },
  // { title: 'SSS', key: 'lastLogin', sortable: false },
  // { title: 'Philhealth', key: 'lastLogin', sortable: false },
  // { title: 'Pag-Ibig', key: 'lastLogin', sortable: false },
  // { title: 'Net Gross Pay', key: 'lastLogin', sortable: false },
  // { title: 'W/Holding Tax', key: 'lastLogin', sortable: false },
  // { title: 'SSS Loan', key: 'lastLogin', sortable: false },
  // { title: 'Pag-Ibig Loan', key: 'lastLogin', sortable: false },
  // { title: 'Cash Advance', key: 'lastLogin', sortable: false },
  // { title: 'Health Card', key: 'lastLogin', sortable: false },
  // { title: 'Net Pay', key: 'lastLogin', sortable: false },

  { title: 'Employee No', key: 'employee_no', sortable: false },
  { title: 'Name', key: 'employee_name', sortable: false },
  { title: 'Position', key: 'position', sortable: false },
  { title: 'Department', key: 'department', sortable: false },
  { title: 'Rate per day', key: 'rate_per_day', sortable: false },
  { title: 'Rate per hour', key: 'rate_per_hour', sortable: false },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
];

const employees = ref([])
const employee_id = ref('')
const createPayrollDialog = ref(false)
const payroll = ref([])


onMounted(async () => {
  await getUsers();
})

const openPayrollDialog = async (item) => {
  console.log('Employee details: ', item)
  fetchPayroll()
  employee_id.value = item.documentId
  createPayrollDialog.value = true
}

const fetchPayroll = async () => {
  const res = await $fetch(`${baseUrl}/api/payroll-periods`);
  payroll.value = res.data
}

const getUsers = async () => {
  try {
    const res = await $fetch(`${baseUrl}/api/employees?populate=*`)

    if (res) {
      employees.value = res.data;
      console.log("Employees: ", res.data)
      loading.value = false
    }
  } catch (err) {
    console.error('Failed to fetch data.', err)
    loading.value = false
    throw err;
  }
}

const itemProps = async (item) => {
  return {
    payroll_period_start: item.payroll_period_start,
    payroll_period_end: item.payroll_period_end
  }
}

const items = ref([])
const search = ref('')
const loading = ref(true)
const createUserDialog = ref(false)

const form = ref({
  payroll_period: '',
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

const computeValues = () => {
  const f = form.value
  f.gross_pay =
    f.basic_pay + f.honorarium + f.premium +
    f.extra_loads + f.overtime - f.late_deduction

  f.net_gross_pay =
    f.gross_pay - (f.sss + f.philhealth + f.pagibig)

  f.net_pay =
    f.net_gross_pay -
    (f.withholding_tax + f.sss_loan + f.pagibig_loan + f.cash_advance + f.health_card)
}

watch(form, computeValues, { deep: true })

const submitForm = async () => {
  const payload = {
    // payroll_period: form.value.payroll_period.documentId,
    // employee: employee_id.value,
    basic_pay: form?.value.basic_pay,
    honorarium: form?.value.honorarium,
    premium: form?.value.premium,
    extra_loads: form?.value.extra_loads,
    overtime: form?.value.overtime,
    late_deduction: form?.value.late_deduction,
    sss: form?.value.sss,
    philhealth: form?.value.philhealth,
    pagibig: form?.value.pagibig,
    withholding_tax: form?.value.withholding_tax,
    sss_loan: form?.value.sss_loan,
    pagibig_loan: form?.value.pagibig_loan,
    cash_advance: form?.value.cash_advance,
    health_card: form?.value.health_card
  }
  console.log("Form data: ", payload)

  await $fetch(`${baseUrl}/api/payslips`, {
    method: 'POST',
    body: {
      data: {
        payroll_period: form.value?.payroll_period.documentId,
        employee: employee_id.value,
        basic_pay: form?.value.basic_pay,
        honorarium: form?.value.honorarium,
        premium: form?.value.premium,
        extra_loads: form?.value.extra_loads,
        overtime: form?.value.overtime,
        late_deduction: form?.value.late_deduction,
        sss: form?.value.sss,
        philhealth: form?.value.philhealth,
        pagibig: form?.value.pagibig,
        withholding_tax: form?.value.withholding_tax,
        sss_loan: form?.value.sss_loan,
        pagibig_loan: form?.value.pagibig_loan,
        cash_advance: form?.value.cash_advance,
        health_card: form?.value.health_card
      }
    }
  })

  alert("Saved");
}
</script>

<style></style>