<template>
  <div>
    <AppBreadcrumb :breadcrumbs="breadcrumbItems" theme="light" class="mb-3" />
    <v-card elevation="0" rounded="lg" class="mt-5">
      <v-toolbar color="transparent">
        <v-toolbar-title><v-icon start>mdi-cash-clock</v-icon> Payroll Management</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-title class="d-flex align-center">
        <!-- <v-btn class="my-2 text-capitalize" prepend-icon="mdi-plus" color="primary" to="/inventory/create">Add
          Item</v-btn> -->
        <v-btn class="my-2 text-capitalize" elevation="0" prepend-icon="mdi-plus" color="primary"
          @click="createPayrollDialog = true">Add Payroll</v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
          variant="solo-filled" flat hide-details single-line></v-text-field>

      </v-card-title>
      <v-divider></v-divider>
      <v-data-table density="compact" :headers="header" :items="payroll" :search="search" :loading="loading"
        show-select>

        <template v-slot:[`item.payroll_period`]="{ item }">
          {{ formatDate(item.payroll_period_start) }} - {{ formatDate(item.payroll_period_end) }}
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">

          <v-btn size="small" class="mr-1 text-capitalize" variant="tonal" color="blue"
            :to="`/payroll/${item.documentId}`"><v-icon start>mdi-account-cog-outline</v-icon> Manage</v-btn>
          <v-btn size="small" variant="tonal" color="red" @click="deleteItem(item.documentId)">
            <v-icon>mdi-delete</v-icon> Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="createPayrollDialog" width="500">
      <v-card>
        <v-toolbar><v-toolbar-title>
            <v-icon start>mdi-cash-clock</v-icon>
            Create Payroll</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="createPayrollDialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form ref="createPayrollForm" v-model="formValid" class="mt-2" @submit.prevent="createPayroll">
            <v-date-input prepend-icon="" input-mode="calendar" prepend-inner-icon="mdi-calendar-range" :rules="[rules.payrollPeriod]"
              variant="solo-filled" flat v-model="payrollPeriod" :model-modifiers="{ time: false}" label="Payroll Period" multiple="range"></v-date-input>
            <v-btn class="mt-2" :loading="loadingBtn" :disabled="loadingBtn" block color="primary" type="submit">Create
              Payroll</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>




  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'role-check',
  allowedRoles: ['Staff']
})
useHead({
  title: 'Payroll',

})
const baseUrl = useRuntimeConfig().public.strapiUrl
const breadcrumbItems = [
  { text: 'Dashboard', to: '/', icon: 'mdi-home-outline' },
  { text: 'Payroll Management' },
]
const header = [
  { title: 'Payroll Period', key: 'payroll_period', sortable: false },
  { title: 'Created At', key: 'createdAt', sortable: false },
  { title: 'Created By', key: 'created_by', sortable: false },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
];

const formValid = ref(true)
const loadingBtn = ref(false)
const payroll = ref([])
const search = ref('')
const loading = ref(true)
const createPayrollDialog = ref(false);
const createPayrollForm = ref(null);
const payrollPeriod = ref(null)
const rules = {
  payrollPeriod: (v) => !!v || "this field is required"
}


onMounted(async () => {
  await getPayroll();
})

const getPayroll = async () => {
  try {
    const res = await $fetch(`${baseUrl}/api/payroll-periods?populate=*`)

    if (res) {
      payroll.value = res.data;
      //console.log("Payroll Period: ", res.data)
      loading.value = false
    }
  } catch (err) {
    console.error('Failed to fetch data.', err)
    loading.value = false
    throw err;
  }
}

const createPayroll = async () => {
  const { valid } = await createPayrollForm.value.validate();
  if (!valid) return
  console.log("1")


  try {
      
    const firstPeriod = payrollPeriod.value[1]
    const lastPeriod = payrollPeriod.value[payrollPeriod.value?.length - 1]
    console.log("1st Payroll Period: ", firstPeriod)
    console.log("2nd Payroll Period: ", lastPeriod)
    console.log('Payroll Period: ', payrollPeriod.value)
    loadingBtn.value = true;

    const toYMD = (date) => {
      if (!date) return null
      return date.split('T')[0]
    }
    await $fetch(`${baseUrl}/api/payroll-periods`, {
      method: 'POST',
      body: {
        data: {
          payroll_period_start: firstPeriod,
          payroll_period_end: lastPeriod
        }

      }
    })
    loadingBtn.value = false
    createPayrollDialog.value = false
    getPayroll()
    alert('Payroll Period successfully created!')
  } catch (err) {
    console.error('Error creating payroll', err);
    loadingBtn.value = false
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

</script>

<style></style>