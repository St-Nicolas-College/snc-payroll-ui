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
          @click="createEmployeeDialog = true">Add
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
          <v-btn size="small" class="mr-1" variant="tonal" color="info" :to="`/employees/${item.documentId}`"><v-icon
              start>mdi-account-cog-outline</v-icon> Manage</v-btn>
          <v-btn size="small" variant="tonal" color="red" @click="deleteItem(item.documentId)">
            <v-icon>mdi-delete</v-icon> Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- DIALOG BOX -->
    <v-dialog v-model="createEmployeeDialog" width="800">
      <v-card>

        <v-toolbar><v-toolbar-title>
            <v-icon start>mdi-cash-clock</v-icon>
            Create Employee</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="createEmployeeDialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form ref="createEmployeeForm" v-model="formValid" class="mt-2">
            <!-- <v-date-input prepend-icon="" input-mode="calendar" prepend-inner-icon="mdi-calendar-range"
              :rules="[rules.payrollPeriod]" variant="solo-filled" flat v-model="payrollPeriod"
              :model-modifiers="{ time: false }" label="Payroll Period" multiple="range"></v-date-input> -->
            <p class="font-weight-bold mb-4"><v-icon start>mdi-account</v-icon> Employee Information</p>
            <!-- <v-list-subheader class="font-weight-bold">Employee Information</v-list-subheader> -->

            <v-row dense>
              <v-col cols="12" md="4"><v-text-field hide-details="auto" :rules="[rules.general]" label="Employee No" v-model="employeeNo"
                  variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="8"><v-text-field hide-details="auto" :rules="[rules.general]" label="Employee Name" v-model="employeeName"
                  variant="solo-filled" flat></v-text-field></v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" md="6"><v-text-field label="Position" :rules="[rules.general]" v-model="position" variant="solo-filled"
                  flat></v-text-field></v-col>
              <v-col cols="12" md="6"><v-text-field label="Department" :rules="[rules.general]" v-model="department" variant="solo-filled"
                  flat></v-text-field></v-col>
            </v-row>
            <v-divider class="mb-4"></v-divider>
            <p class="font-weight-bold mb-4"><v-icon start>mdi-credit-card-outline</v-icon> Salary Information</p>
            <v-row dense>
              <v-col cols="12" md="3"><v-text-field hide-details="auto" :rules="[rules.general]" type="number" prefix="₱" label="Basic Pay"
                  v-model="basicPay" variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="3"><v-text-field hide-details="auto"  type="number" prefix="₱" label="Honorarium"
                  v-model="honorarium" variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="3"><v-text-field hide-details="auto"  type="number" prefix="₱" label="Premium"
                  v-model="premium" variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="3"><v-text-field hide-details="auto"  type="number" prefix="₱" label="Amount Per Unit"
                  v-model="amountPerUnit" variant="solo-filled" flat></v-text-field></v-col>
            </v-row>
            <v-list-subheader class="font-weight-bold mt-2">Premiums</v-list-subheader>
            <v-row dense>
              <v-col cols="12" md="4"><v-text-field hide-details="auto" type="number" prefix="₱" label="SSS"
                  v-model="sss" variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="4"><v-text-field hide-details="auto" type="number" prefix="₱" label="Philhealth"
                  v-model="philhealth" variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="4"><v-text-field hide-details="auto" type="number" prefix="₱" label="Pag-Ibig"
                  v-model="pagibig" variant="solo-filled" flat></v-text-field></v-col>
            </v-row>

            <v-list-subheader class="font-weight-bold mt-2">Other Deductions</v-list-subheader>
            <v-row dense>
              <v-col cols="12" md="6"><v-text-field hide-details="auto" type="number" prefix="₱"
                  label="Cash Advance Amount" v-model="cashAdvanceAmount" variant="solo-filled"
                  flat></v-text-field></v-col>
              <!-- <v-col cols="12" md="6"><v-text-field hide-details="auto" type="number" prefix="₱"
                  label="Cash Advance Balance" v-model="cashAdvanceBalance" variant="solo-filled"
                  flat></v-text-field></v-col> -->
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mt-2" color="primary" :loading="loadingBtn" :disabled="loadingBtn" @click="createEmployee()" variant="elevated" type="submit">Create
            Employee</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>

      </v-card>
    </v-dialog>




  </div>
</template>

<script setup>
  useHead({
  title: 'Employees',

})
const token = useCookie('token')
const baseUrl = useRuntimeConfig().public.strapiUrl
definePageMeta({
  middleware: 'role-check',
  allowedRoles: ['Staff']
})
const breadcrumbItems = [
  { text: 'Dashboard', to: '/', icon: 'mdi-home-outline' },
  { text: 'Employee Management' },
]
const header = [
  { title: 'Employee No', key: 'employee_no', sortable: false },
  { title: 'Name', key: 'employee_name', sortable: false },
  { title: 'Position', key: 'position', sortable: false },
  { title: 'Department', key: 'department', sortable: false },
  { title: 'Basic Pay', key: 'basic_pay', sortable: false },
  { title: 'Honorarium', key: 'honorarium', sortable: false },
  { title: 'Premium', key: 'premium', sortable: false },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
];

const formValid = ref(null)
const employees = ref([])
const employee_id = ref('')
const createPayrollDialog = ref(false)
const payroll = ref([])
const employeeNo = ref("");
const employeeName = ref("")
const position = ref("")
const department = ref("")
const basicPay = ref(0)
const honorarium = ref(0)
const premium = ref(0)
const amountPerUnit = ref(0)
const sss = ref(0)
const philhealth = ref(0)
const pagibig = ref(0)
const cashAdvanceAmount = ref(0)
const cashAdvanceBalance = ref(0)

const createEmployeeDialog = ref(false)
const createEmployeeForm = ref(null)
const loadingBtn = ref(false)

const rules = {
  general: (v) => !!v || "This field is required",
}


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
  const res = await $fetch(`${baseUrl}/api/payroll-periods`, {
    headers: {
              Authorization: `Bearer ${token.value}`
            },
  });
  payroll.value = res.data
}

const getUsers = async () => {
  try {
    const res = await $fetch(`${baseUrl}/api/employees?populate=*`, {
      headers: {
              Authorization: `Bearer ${token.value}`
            },
    })

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

const createEmployee = async () => {
  loadingBtn.value = true
  const isValid = await createEmployeeForm.value.validate();
  if (isValid.valid) {
    try {
      const payload = {
        data: {
          employee_no: employeeNo.value,
          employee_name: employeeName.value,
          position: position.value,
          department: department.value,
          basic_pay: basicPay.value,
          honorarium: honorarium.value,
          premium: premium.value,
          amount_per_unit: amountPerUnit.value,
          sss: sss.value,
          philhealth: philhealth.value,
          pagibig: pagibig.value,
          cash_advance_amount: cashAdvanceAmount.value,
          cash_advance_balance: cashAdvanceAmount.value
        }
      }


      await $fetch(`${baseUrl}/api/employees`, {
        method: 'POST',
        headers: {
              Authorization: `Bearer ${token.value}`
            },
        body: payload
      })

      getUsers();
      loadingBtn.value = false
      console.log("Employee successfully created: ", payload)
      alert("Employee successfully created")
      createEmployeeForm.value?.reset();
      basicPay.value = 0;
      honorarium.value = 0;
      premium.value = 0
      amountPerUnit.value = 0;
      sss.value = 0
      philhealth.value = 0;
      pagibig.value = 0;
      cashAdvanceAmount.value = 0;
      //cashAdvanceBalance.value = 0;
    } catch (err) {
      loadingBtn.value = false
      console.error("Error creating.", err)
    }
  } else {
    loadingBtn.value = false
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
    headers: {
              Authorization: `Bearer ${token.value}`
            },
    body: {
      data: {
        payroll_period: form.value?.payroll_period.documentId,
        employee: employee_id.value,
        basic_pay: form?.value.basic_pay,
        honorarium: form?.value.honorarium,
        premium: form?.value.premium,
        amount_per_unit: form?.value.amount_per_unit,
        no_of_unit: form?.value.no_of_unit,
        units_total_amount: form?.value.units_total_amount,
        overtime: form?.value.overtime,
        late_deduction: form?.value.late_deduction,
        gross_pay: form?.value.gross_pay,
        sss: form?.value.sss,
        philhealth: form?.value.philhealth,
        pagibig: form?.value.pagibig,
        net_gross_pay: form?.value.net_gross_pay,
        withholding_tax: form?.value.withholding_tax,
        sss_loan: form?.value.sss_loan,
        pagibig_loan: form?.value.pagibig_loan,
        cash_advance_amount: form?.value.cash_advance_amount,
        cash_advance_balance: form?.value.cash_advance_balance,
        cash_advance_deduction: form?.value.cash_advance_deduction,
        health_card: form?.value.health_card,
        net_pay: form?.value.net_pay
      }
    }
  })

  alert("Saved");
}
</script>

<style></style>