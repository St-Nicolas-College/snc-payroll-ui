<template>
  <div>
    <div class="text-center mt-3 no-print">
      <v-btn color="secondary" prepend-icon="mdi-printer" class="mb-4 mr-2" :disabled="disabledBtn"
        @click="printPreview">
        Print</v-btn>
      <v-btn color="info" prepend-icon="mdi-pencil" class="mb-4 mr-2" :disabled="disabledBtn" @click="signatory = true">
        Signatory</v-btn>
      <v-btn color="primary" prepend-icon="mdi-download" class="mb-4" :disabled="disabledBtn" @click="downloadPdf">
        Download
      </v-btn>


    </div>



    <div id="pdf-pages" class="off-screen-temp-print"></div>

    <!-- Payroll Layout Area -->
    <div v-if="noData">
      <div class="text-center">No Records Found</div>
    </div>
    <!-- LOADER -->
    <div v-if="loading" class="loader-wrapper">
      <v-progress-circular indeterminate color="primary" size="50" />
      <div class="mt-2 text-caption">Loading payslips...</div>
    </div>

    <div v-else>
      <div class="landscape-report">
        <v-row>
          <v-col cols="12" class="print-header d-flex align-center">
            <header class="report-header">
              <img src="/SNC-Logo.png" class="logo" alt="SNC Logo">
              <div class="text-center mt-2">
                <h1 class="org-name">St. Nicolas College of Business and Technology</h1>
                <h2 class="org-sub">Finance Department - Payroll Summary Report</h2>
                <h2 class="payroll-period">Payroll Period: {{ formatDate(payroll.payroll_period_start) }} - {{
                  formatDate(payroll.payroll_period_end) }}</h2>
                <h2 class="payroll-period text-uppercase">{{ mode }}</h2>
              </div>
            </header>
          </v-col>

          <v-col cols="12">
            <v-divider></v-divider>

            <v-data-table :items="payslips" :headers="header" density="compact" items-per-page="-1" hide-default-footer
              class="printable-table">
              <template #[`item.basic_pay`]="{ item }">
                {{ formatCurrency(item.basic_pay) }}
              </template>
              <template #[`item.honorarium`]="{ item }">
                {{ formatCurrency(item.honorarium) }}
              </template>
              <template #[`item.premium`]="{ item }">
                {{ formatCurrency(item.premium) }}
              </template>
              <template #[`item.units_total_amount`]="{ item }">
                {{ formatCurrency(item.units_total_amount) }}
              </template>
              <template #[`item.overtime`]="{ item }">
                {{ formatCurrency(item.overtime) }}
              </template>
              <template #[`item.late_deduction`]="{ item }">
                {{ formatCurrency(item.late_deduction) }}
              </template>
              <template #[`item.gross_pay`]="{ item }">
                {{ formatCurrency(item.gross_pay) }}
              </template>
              <template #[`item.sss`]="{ item }">
                {{ formatCurrency(item.sss) }}
              </template>
              <template #[`item.philhealth`]="{ item }">
                {{ formatCurrency(item.philhealth) }}
              </template>
              <template #[`item.pagibig`]="{ item }">
                {{ formatCurrency(item.pagibig) }}
              </template>
              <template #[`item.net_gross_pay`]="{ item }">
                {{ formatCurrency(item.net_gross_pay) }}
              </template>
              <template #[`item.withholding_tax`]="{ item }">
                {{ formatCurrency(item.withholding_tax) }}
              </template>
              <template #[`item.sss_loan`]="{ item }">
                {{ formatCurrency(item.sss_loan) }}
              </template>
              <template #[`item.pagibig_loan`]="{ item }">
                {{ formatCurrency(item.pagibig_loan) }}
              </template>
              <template #[`item.cash_advance_deduction`]="{ item }">
                {{ formatCurrency(item.cash_advance_deduction) }}
              </template>
              <template #[`item.health_card`]="{ item }">
                {{ formatCurrency(item.health_card) }}
              </template>
              <template #[`item.net_pay`]="{ item }">
                {{ formatCurrency(item.net_pay) }}
              </template>
            </v-data-table>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row class="print-only">
          <v-col>
            <div class="grand-total"> Grand Total: {{ formatCurrency(totalNetPay) }}</div>
          </v-col>
        </v-row>
        <v-row class="print-only mt-12">
          <v-col cols="4">
            <div class="sig-line">Prepared By:</div>
            <br>
            <div>{{ preparedBy }}</div>
          </v-col>
          <v-col cols="4">
            <div class="sig-line">Noted By:</div>
            <br>
            <div>{{ notedBy }}</div>
          </v-col>
          <v-col cols="4">
            <div class="sig-line">Approved By:</div>
            <br>
            <div>{{ approvedBy }}</div>
          </v-col>
        </v-row>
      </div>
    </div>


    <v-dialog v-model="signatory" width="500" class="no-print">
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-icon size="25" start>mdi-pencil</v-icon> Signatory
          <v-spacer></v-spacer>
          <v-btn @click="signatory = false" flat icon><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-row dense>
              <v-col cols="12">
                <v-text-field label="Prepared by" v-model="preparedBy" variant="solo-filled" flat></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Noted by" v-model="notedBy" variant="solo-filled" flat></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select label="Select" v-model="newApprovedBy" :items="['Mr. Gregorio Sison Jr.', 'Mr. Melchor Caluag']"
                  variant="solo-filled" flat></v-select>
              </v-col>
            </v-row>
            <v-btn color="primary" @click="updateSignatory" block>Update</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
const token = useCookie('token')
useHead({
  title: 'Print',

})
const loading = ref(true)
const disabledBtn = ref(true)
const noData = ref(false)
const signatory = ref(false)
const props = defineProps({
  payroll: {
    type: Object,
    required: true
  },
  payslips: {
    type: Array,
    required: true
  },
  mode: {
    type: String,
    required: true
  }
})
const header = [
  { title: 'ID No', key: 'employee.employee_no' },
  { title: 'Employee Name', key: 'employee.employee_name', sortable: false },
  { title: 'Basic Pay', key: 'basic_pay', align: 'center', sortable: false },
  { title: 'Honorarium', key: 'honorarium', align: 'center', sortable: false },
  { title: 'Premium', key: 'premium', align: 'center', sortable: false },
  { title: 'Loads', key: 'units_total_amount', align: 'center', sortable: false },
  { title: 'Overtime', key: 'overtime', align: 'center', sortable: false },
  { title: 'Late', key: 'late_deduction', align: 'center', sortable: false },
  { title: 'Gross Pay', key: 'gross_pay', align: 'center', sortable: false },
  { title: 'SSS', key: 'sss', align: 'center', sortable: false },
  { title: 'Philhealth', key: 'philhealth', align: 'center', sortable: false },
  { title: 'Pag-Ibig', key: 'pagibig', align: 'center', sortable: false },
  { title: 'Net Gross Pay', key: 'net_gross_pay', align: 'center', sortable: false },
  { title: 'W/Holding Tax', key: 'withholding_tax', align: 'center', sortable: false },
  { title: 'SSS Loan', key: 'sss_loan', align: 'center', sortable: false },
  { title: 'Pag-Ibig Loan', key: 'pagibig_loan', align: 'center', sortable: false },
  { title: 'Cash Advance', key: 'cash_advance_deduction', align: 'center', sortable: false },
  { title: 'Health Card', key: 'health_card', align: 'center', sortable: false },
  { title: 'Net Pay', key: 'net_pay', align: 'center', sortable: false },
]
const preparedBy = ref('Ms. Karen Batas')
const notedBy = ref('Ms. April Manarang')
const approvedBy = ref('Mr. Gregorio Sison Jr.')
const newApprovedBy =  ref('')

const updateSignatory = () => {
  approvedBy.value = newApprovedBy.value
  alert("Signatory updated successfully!")
  signatory.value = false
}


watch(() => props.payslips, (val) => {
  if (val && val.length) {
    loading.value = false
    disabledBtn.value = false
    noData.value = false
  }

  if (val && val.length == 0) {
    console.log('No Record Found')
    loading.value = false
    noData.value = true
  }
},
  { immediate: true })


const renderPayrollReportForPrint = (payrollData) => {

}

const printPreview = async () => {
  // 3. Trigger the browser's print dialog
  window.print();
}

const downloadPdf = async () => {

}

const totalNetPay = computed(() => {
  if (!props.payroll.payslips) return 0

  // return payrollDetails.value.payslips.reduce((sum, row) => {
  //   sum + Number(row.net_pay || 0), 0
  // })
  return props.payroll.payslips.reduce((sum, row) => sum + Number(row.net_pay), 0)
})


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

</script>

<style scoped>
/* Center the header content */
.report-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Centers items horizontally */
  justify-content: center;
  width: 100%;
}

/* SCREEN STYLES */
.logo {
  height: 70px;
  width: auto;
}

.org-name {
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
}

.org-sub {
  font-size: 1rem;
  text-align: center;
}

.payroll-period {
  font-size: 0.9rem;

}

.grand-total {
  font-size: 1rem;
  font-weight: bold;
}


/* PRINT STYLES */
@media print {
  @page {
    size: legal landscape;
    margin: 0.3in;
    /* Smaller margins give you more room for columns */
  }

  .no-print {
    display: none !important;
  }

  /* Reset Vuetify container constraints */
  .v-container {
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    max-width: none !important;
  }

  .landscape-report {
    width: 100% !important;
  }



  /* Force the table to be 100% width and remove scrollbars */
  :deep(.v-data-table) {
    width: 100% !important;
    table-layout: auto !important;
    /* Let columns expand as needed */
  }

  :deep(.v-table__wrapper) {
    overflow: visible !important;
  }

  /* Typography adjustments for high-density payroll data */
  :deep(th) {
    font-size: 8pt !important;
    /* Smaller headers for many columns */
    text-transform: uppercase;
    /* background-color: #f5f5f5 !important; */
    -webkit-print-color-adjust: exact;
  }

  :deep(td) {
    font-size: 8pt !important;
    padding: 2px 4px !important;
    /* Tighter cells */
  }
}
</style>