<template>
  <div>
    <AppBreadcrumb :breadcrumbs="breadcrumbItems" theme="light" class="mb-3" />
    <v-card elevation="0" rounded="lg" class="mt-5">
      <v-toolbar color="transparent">
        <v-toolbar-title><v-icon start>mdi-cash-clock</v-icon> Payroll Details </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="my-2 text-capitalize" variant="elevated" elevation="0" prepend-icon="mdi-plus" color="primary"
          :to="`/payroll/${route.params.id}/create`">Add Payroll</v-btn>

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

const payrollDetails = ref({})



const fetchPayroll = async () => {
  const res = await $fetch(`${baseUrl}/api/payroll-periods/${route.params.id}`, {
    params: {
      'populate': '*'
    }
  })

  payrollDetails.value = res.data;
  console.log('Payroll Details:', res.data)
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


onMounted(async () => {
  await fetchPayroll();
})
</script>

<style></style>