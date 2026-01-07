<template>
  <div>
    <div class="text-center mt-3">
      <v-btn color="secondary" prepend-icon="mdi-printer" class="mb-4 mr-2" :disabled="disabledBtn" @click="printPreview">
        Print</v-btn>
      <v-btn color="primary" prepend-icon="mdi-download" class="mb-4" :disabled="disabledBtn" @click="downloadPdf">
        Download
      </v-btn>
    </div>
    <!-- <div id="pdf-pages" style="display:none;"></div> -->
    <div id="pdf-pages" class="off-screen-temp-print"></div>

    <!-- 4-PaySlip Layout Area -->

    <div v-if="noData">
      <div class="text-center">No Records Found</div>
    </div>
    <!-- LOADER -->
    <div v-if="loading" class="loader-wrapper">
      <v-progress-circular indeterminate color="primary" size="50" />
      <div class="mt-2 text-caption">Loading payslips…</div>
    </div>

    <div v-else id="print-area" class="print-grid">

      <div v-for="p in payslips" :key="p.id" class="payslip-box">
        <!-- HEADER -->
        <!-- <div style="text-align: center; font-weight: bold; border-bottom: 1px solid black; padding-bottom: 4px;">
          St. Nicolas College of Business & Technology
          <br>
          PAYSLIP
        </div> -->
        <div class="print-header">
          <img src="/SNC-Logo.png" class="logo" />

          <div class="header-text">
            <div class="org-name">St. Nicolas College of Business and Technology</div>
            <div class="org-sub">Finance Department</div>

          </div>
        </div>

        <!-- Employee Info -->
        <div>
          <strong>Employee:</strong> {{ p.employee?.employee_name }} <br>
          <strong>Employee No.:</strong> {{ p.employee?.employee_no }} <br>
          <strong>Payroll Period:</strong> {{ formatDate(p.payroll_period.payroll_period_start) }} - {{
            formatDate(p.payroll_period.payroll_period_end) }}
        </div>

        <div style="margin-top: 6px; border-top: 1px solid black;"></div>

        <!-- EARNINGS SECTION -->
        <div style="margin-top: 4px; font-weight: bold;">EARNINGS</div>
        <div class="row">
          <span>Loads/Extra Loads</span>
          <span v-if="p.no_of_units != 0">{{ p.no_of_units }}</span>
          <span>{{ formatCurrency(p.units_total_amount) }}</span>
        </div>
        <div class="row">
          <span>Basic Pay</span>
          <span>{{ formatCurrency(p.basic_pay) }}</span>
        </div>
        <div class="row">
          <span>Honorarium</span>
          <span>{{ formatCurrency(p.honorarium) }}</span>
        </div>
        <div class="row">
          <span>Premium</span>
          <span>{{ formatCurrency(p.premium) }}</span>
        </div>

        <div class="row">
          <span>Overtime</span>
          <span>{{ formatCurrency(p.overtime) }}</span>
        </div>
        <div class="row">
          <span>(Less) Late</span>
          <span>{{ formatCurrency(p.late_deduction) }}</span>
        </div>

        <div class="row total">
          <strong>GROSS PAY</strong>
          <strong>{{ formatCurrency(p.gross_pay) }}</strong>
        </div>

        <!-- CONTRIBUTIONS -->
        <div style="margin-top: 6px; font-weight: bold;">CONTRIBUTIONS</div>
        <div class="row">
          <span>SSS</span>
          <span>{{ formatCurrency(p.sss) }}</span>
        </div>
        <div class="row">
          <span>PhilHealth</span>
          <span>{{ formatCurrency(p.philhealth) }}</span>
        </div>
        <div class="row">
          <span>Pag-ibig</span>
          <span>{{ formatCurrency(p.pagibig) }}</span>
        </div>

        <div class="row total">
          <strong>NET GROSS PAY</strong>
          <strong>{{ formatCurrency(p.net_gross_pay) }}</strong>
        </div>

        <!-- DEDUCTIONS -->
        <div style="margin-top: 6px; font-weight: bold;">OTHER DEDUCTIONS</div>
        <div class="row">
          <span>Withholding Tax</span>
          <span>{{ formatCurrency(p.withholding_tax) }}</span>
        </div>
        <div class="row">
          <span>SSS Loan</span>
          <span>{{ formatCurrency(p.sss_loan) }}</span>
        </div>
        <div class="row">
          <span>Pag-ibig Loan</span>
          <span>{{ formatCurrency(p.pagibig_loan) }}</span>
        </div>
        <div class="row">
          <span>Cash Advance</span>
          <span>{{ formatCurrency(p.cash_advance_deduction) }}</span>
        </div>
        <div class="row">
          <span>Health Card</span>
          <span>{{ formatCurrency(p.health_card) }}</span>
        </div>
        <div class="row">
          <strong>Other Deductions Total</strong>
          <strong>{{ formatCurrency(totalOtherDeductions(p)) }}</strong>
        </div>
        <div class="row"></div>

        <div class="row total netpay-total">
          <strong>NET PAY</strong>
          <strong>{{ formatCurrency(p.net_pay) }}</strong>
        </div>

        <div class="received_by mt-2">
          <span>Prepared by: <span>Elaiza</span></span>

        </div>
        <div>
          <span>Received by: </span>
        </div>
      </div>
    </div>


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
const props = defineProps({
  payslips: {
    type: Array,
    required: true
  }
})


watch(
  () => props.payslips, (val) => {
    if (val && val.length) {
      loading.value = false
      disabledBtn.value = false
      noData.value = false
    } 
    // else {
    //   console.log("No record found", val)
    //   noData.value = true
    //   //loading.value = false
    // }

    if (val && val.length == 0) {
      console.log('No Record Found')
      loading.value = false
      noData.value = true
    }
  },
  { immediate: true })

const renderPayslipsForPrint = (payslipsArray) => {
  const payslipsPerPage = 4;
  const pdfPagesContainer = document.getElementById("pdf-pages");
  pdfPagesContainer.innerHTML = '';

  // Target the visible payslips for cloning
  const allPayslipBoxes = document.querySelectorAll('#print-area .payslip-box');

  for (let i = 0; i < allPayslipBoxes.length; i += payslipsPerPage) {
    const printPage = document.createElement('div');
    printPage.className = 'print-grid';
    // Apply inline styles to guarantee the 2x2 grid layout is used for printing/PDF
    printPage.style.cssText = `
            width: 210mm;
            height: 297mm;
            padding: 5mm;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            grid-gap: 5mm;
            box-sizing: border-box;
            background: white;
            break-after: always; /* 🛑 Key for page breaks in print preview */
        `;

    for (let j = 0; j < payslipsPerPage; j++) {
      if (allPayslipBoxes[i + j]) {
        printPage.appendChild(allPayslipBoxes[i + j].cloneNode(true));
      }
    }

    pdfPagesContainer.appendChild(printPage);
  }
  return Math.ceil(allPayslipBoxes.length / payslipsPerPage);
};

// --- NEW FUNCTION: Print Preview ---
const printPreview = async () => {
  // 1. Render all pages into the hidden area
  renderPayslipsForPrint(props.payslips);

  // 2. Temporarily hide the main view and show the print view
  const printArea = document.getElementById('print-area');
  const pdfPagesContainer = document.getElementById("pdf-pages");

  // Hide the default 2x2 view
  printArea.style.display = 'none';
  // Show the prepared multi-page view 
  pdfPagesContainer.style.position = 'static';
  pdfPagesContainer.style.left = '0';
  pdfPagesContainer.style.display = 'block';

  // 3. Trigger the browser's print dialog
  window.print();

  // 4. Wait for the dialog to close (or a short delay, as window.print is blocking)
  await new Promise(resolve => setTimeout(resolve, 100));

  // 5. Restore the original view
  pdfPagesContainer.style.display = 'none';
  printArea.style.display = 'grid';

  // Clean up temporary content
  pdfPagesContainer.innerHTML = '';
};

const downloadPdf = async () => {
  // 1. Define constants for PDF and Print layout
  const doc = new jsPDF('p', 'mm', 'a4');
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  const payslipsPerPage = 4;

  // Use the off-screen class defined earlier to ensure visibility
  const pdfPagesContainer = document.getElementById("pdf-pages");

  // 🛑 Make sure this container uses the off-screen class defined in CSS
  // If you haven't defined the CSS for 'off-screen-temp-print', use this:
  // pdfPagesContainer.style.position = 'absolute';
  // pdfPagesContainer.style.left = '-9999px'; 

  pdfPagesContainer.innerHTML = '';

  // Get the payslip boxes from the visible area
  const allPayslipBoxes = document.querySelectorAll('#print-area .payslip-box');

  // 2. Iterate and group payslips into pages
  for (let i = 0; i < allPayslipBoxes.length; i += payslipsPerPage) {
    // Create a new temporary print grid for the current page
    const printPage = document.createElement('div');

    // 🛑 CRITICAL FIX: Ensure the grid CSS is applied to the temporary container
    printPage.className = 'print-grid';
    // 🛑 Also, ensure inline styling for the grid is present if necessary
    printPage.style.cssText = `
            width: 210mm;
            height: 297mm;
            padding: 5mm;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            grid-gap: 5mm;
            box-sizing: border-box;
            background: white;
        `;

    // Append the next 4 payslips to this temporary page container
    for (let j = 0; j < payslipsPerPage; j++) {
      if (allPayslipBoxes[i + j]) {
        // Clone the box to ensure the original view remains intact
        printPage.appendChild(allPayslipBoxes[i + j].cloneNode(true));
      }
    }

    // Add the temporary page grid to the hidden container
    pdfPagesContainer.appendChild(printPage);
  }

  // 🛑 Add a delay to ensure the DOM has fully rendered the new elements
  await new Promise(resolve => setTimeout(resolve, 50));

  // 3. Process each page container and add to PDF
  const pagesToPrint = document.querySelectorAll('#pdf-pages .print-grid');

  for (let i = 0; i < pagesToPrint.length; i++) {
    const pageElement = pagesToPrint[i];

    const canvas = await html2canvas(pageElement, {
      scale: 2,
      useCORS: true,
      timeout: 5000,
      logging: true,
    });

    const imgData = canvas.toDataURL("image/png");

    if (imgData.length < 100) {
      console.error("html2canvas failed to create valid image data. Length is too short.");
      // Continue to the next page or handle the error gracefully
      continue;
    }

    if (i > 0) {
      doc.addPage();
    }

    doc.addImage(imgData, "PNG", 0, 0, width, height);
  }

  // 4. Save and Clean up
  // doc.autoPrint()
  // var w = 600;
  // var h = 600;
  // var left = (window.innerWidth / 2) - (w / 2);
  // var top = (window.innerHeight / 2) - (h / 2);
  // window.open(doc.output('bloburl'), '_blank', 'modal,location=no,menubar=no, scrollbars=no,titlebar=no,toolbar=no,top=' + top + ',left=' + left + ',width=' + w + ',height=' + h + '');
  doc.save("payslips_2x2_grid.pdf");
  pdfPagesContainer.innerHTML = '';
};

const totalOtherDeductions = (p) => {
  return (
    Number(p.withholding_tax || 0) +
    Number(p.sss_loan || 0) +
    Number(p.pagibig_loan || 0) +
    Number(p.cash_advance_deduction || 0) +
    Number(p.health_card || 0)
  )
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(value)
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
<style scoped>
.print-grid {
  width: 210mm;
  height: 297mm;
  padding: 5mm;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 5mm;
  box-sizing: border-box;
  background: white;
}

.payslip-box {
  border: 1px solid #000;
  padding: 3mm;
  font-size: 10px;
  box-sizing: border-box;
}

.title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
}

.row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dotted gray;
  padding: 0 0;
}


.total {
  background: #eaeaea;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-top: 4px;
  padding: 2px 0;
}
.netpay-total {
  font-size: 12px;
}

.off-screen-temp-print {
  /* Move it far left so users don't see the flicker */
  position: absolute;
  left: -9999px;
  /* Crucially, do NOT use display: none; */
}

.print-header {
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 2px solid black;
  padding-bottom: 6px;
  margin-bottom: 5px;
}

.logo {
  height: 45px;
  width: auto;
}

.header-text {
  text-align: center;
}

.org-name {
  font-size: 11px;
  font-weight: bold;
}

.org-sub {
  font-size: 10px;
}

.loader-wrapper {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


@media print {

  /* Target the buttons and hide them */
  .v-btn {
    display: none !important;
  }

  /* Target the containing div of the buttons (optional, but good practice) */


  /* Hide everything NOT in the print area */
  body * {
    visibility: hidden;
    margin: 0
  }

  button,
  .v-toolbar {
    display: none !important;
  }

  /* Only show the content inside the #pdf-pages container */
  #pdf-pages,
  #pdf-pages * {
    visibility: visible !important;
  }

  /* Ensure the print content starts at the top left */
  #pdf-pages {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>