<template>
  <div>
    <AppBreadcrumb :breadcrumbs="breadcrumbItems" theme="light" class="mb-3" />

    <v-row>
      <v-col cols="12" md="3">
        <v-card elevation="0" rounded="lg">

          <v-card-text>
            <p class="font-weight-bold mb-4"><v-icon start>mdi-account</v-icon> Employee Information</p>

            <v-row dense>
              <v-col cols="5" class="font-weight-bold">Employee Number</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ employee.employee_no }}
              </v-col>
            </v-row>
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

            <v-divider class="mb-2 mt-4"></v-divider>
            <p class="font-weight-bold mb-4"><v-icon start>mdi-credit-card-outline</v-icon> Salary Information</p>
            <v-row dense>
              <v-col cols="5" class="font-weight-bold">Basic Pay</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ formatCurrency(employee.basic_pay) }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="5" class="font-weight-bold">Honorarium</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ formatCurrency(employee.honorarium) }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="5" class="font-weight-bold">Premium</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ formatCurrency(employee.premium) }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="5" class="font-weight-bold">Amount Per Unit</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ formatCurrency(employee.amount_per_unit) }}
              </v-col>
            </v-row>
            <v-list-subheader class="font-weight-bold mt-2">Premiums</v-list-subheader>
            <v-row dense>
              <v-col cols="5" class="font-weight-bold">SSS</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ formatCurrency(employee.sss) }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="5" class="font-weight-bold">Philhealth</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ formatCurrency(employee.philhealth) }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="5" class="font-weight-bold">Pag-Ibig</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ formatCurrency(employee.pagibig) }}
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-row dense>
              <v-col cols="6"><v-btn color="info" variant="flat" class="my-3" block prepend-icon="mdi-pencil"
                  @click="deletePayslipDialog = true"> Edit</v-btn></v-col>
              <v-col cols="6"> <v-btn color="red" variant="flat" class="my-3" block prepend-icon="mdi-delete"
                  @click="deletePayslipDialog = true"> Delete</v-btn></v-col>
            </v-row>

            <!-- <v-btn color="info" variant="flat" class="my-3"  prepend-icon="mdi-pencil"
              @click="deletePayslipDialog = true"> Edit</v-btn>
            <v-btn color="red" variant="flat" class="my-3"  prepend-icon="mdi-delete"
              @click="deletePayslipDialog = true"> Delete</v-btn> -->

          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-card elevation="0" rounded="lg" class="d-none d-md-block">
          <v-card-title>
            <v-icon start>mdi-cash-multiple</v-icon> Payslips
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table density="compact" :headers="headers" :items="payslips" :loading="loading">
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>

            <template v-slot:[`item.payroll_period`]="{ item }">
              {{ formatDate(item.payroll_period?.payroll_period_start) }} - {{
                formatDate(item.payroll_period?.payroll_period_end) }}
            </template>
          </v-data-table>
        </v-card>

        <v-card elevation="0" rounded="lg" class="d-md-none">
          <v-card-title>
            <v-icon start>mdi-cash-multiple</v-icon> Payslips
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div v-for="payslip in payslips" :key="payslip.id">
              <v-row dense>
                <v-col cols="10">
                  <v-row no-gutters>
                    <v-col cols="12" class="font-weight-bold">
                      {{ formatDate(payslip.payroll_period?.payroll_period_start) }} - {{
                        formatDate(payslip.payroll_period?.payroll_period_end) }}
                    </v-col>
                    <v-col cols="12" class="text-medium-emphasis text-color-grey">
                      Net Pay: {{ formatCurrency(payslip.net_pay) }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="2" class="text-right">
                  <v-btn icon="mdi-open-in-new" variant="text" color="info"></v-btn>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import qs from 'qs';
definePageMeta({
  middleware: 'role-check',
  allowedRoles: ['Staff']
})
useHead({
  title: 'Employee Details',

})
const token = useCookie('token')
const baseUrl = useRuntimeConfig().public.strapiUrl
const route = useRoute()
const breadcrumbItems = [
  { text: 'Dashboard', to: '/', icon: 'mdi-home-outline' },
  { text: 'Employee Management', to: '/employees' },
  { text: 'Details' },
]

const employee = ref({})
const payslips = ref([])
const loading = ref(false)
const headers = [
  { title: 'Payroll Period', key: 'payroll_period' },
  { title: 'Basic Pay', key: 'basic_pay', align: 'center', sortable: false },
  { title: 'Gross Pay', key: 'gross_pay', align: 'center', sortable: false },
  { title: 'Net Gross Pay', key: 'net_gross_pay', align: 'end', sortable: false },
  { title: 'Net Pay', key: 'net_pay', align: 'end', sortable: false },
  { title: '', key: 'actions', align: 'end', sortable: false },
]

const fetchEmployeeDetails = async () => {
  try {
    const query = qs.stringify({
      populate: {
        payslips: {
          populate: ['payroll_period']
        }
      }
    })
    const res = await $fetch(`${baseUrl}/api/employees/${route.params.id}?${query}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    if (res) {
      console.log("Successfully fetched..", res.data)
      employee.value = res.data
      payslips.value = res.data.payslips
    }
  } catch (err) {
    console.log('Failed to fetch data.', err)
    throw err;
  }
}

const fetchPayslips = async () => {
  try {
    const res = await $fetch(`${baseUrl}/api/payslips/${route}`)
  } catch (err) {

  }
}

// Format the date created
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format to Philippine peso
function formatCurrency(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(value)
}


onMounted(async () => {
  await fetchEmployeeDetails();
})

</script>

<style></style>
