<template>
  <div>
    <v-btn color="primary" class="mb-4" @click="downloadPdf">
      Download PDF
    </v-btn>

    <!-- <div id="pdf-pages" style="display:none;"></div> -->
     <div id="pdf-pages" class="off-screen-temp-print"></div>

    <!-- 4-PaySlip Layout Area -->

    <div id="print-area" class="print-grid">

      <div v-for="p in payslips" :key="p.id" class="payslip-box">
        <!-- HEADER -->
        <div style="text-align: center; font-weight: bold; border-bottom: 1px solid black; padding-bottom: 4px;">
          St. Nicolas College of Business & Technology
          <br>
          PAYSLIP
        </div>

        <!-- Employee Info -->
        <div style="padding-top: 4px;">
          <strong>Employee:</strong> {{ p.employee?.employee_name }} <br>
          <strong>Employee No.:</strong> {{ p.employee?.employee_no }} <br>
          <strong>Payroll Period:</strong> {{ formatDate(p.payroll_period.payroll_period_start) }} - {{ formatDate(p.payroll_period.payroll_period_end) }}
        </div>

        <div style="margin-top: 6px; border-top: 1px solid black;"></div>

        <!-- EARNINGS SECTION -->
        <div style="margin-top: 4px; font-weight: bold;">EARNINGS</div>
        <div class="row">
          <span>Basic Pay</span>
          <span>{{ formatCurrency(p.basic_pay) }}</span>
        </div>
        <div class="row">
          <span>Honorarium</span>
          <span>{{  formatCurrency(p.honorarium) }}</span>
        </div>
        <div class="row">
          <span>Premium</span>
          <span>{{  formatCurrency(p.premium) }}</span>
        </div>
        <div class="row">
          <span>Extra Loads</span>
          <span v-if="p.units_total_amount == ''">{{  formatCurrency(p.units_total_amount) }}</span>
          <span v-else>0</span>
        </div>
        <div class="row">
          <span>Overtime</span>
          <span>{{  formatCurrency(p.overtime) }}</span>
        </div>
        <div class="row">
          <span>(Less) Late</span>
          <span>{{  formatCurrency(p.late_deduction) }}</span>
        </div>

        <div class="row total">
          <strong>TOTAL GROSS PAY</strong>
          <strong>{{  formatCurrency(p.gross_pay) }}</strong>
        </div>

        <!-- CONTRIBUTIONS -->
        <div style="margin-top: 6px; font-weight: bold;">CONTRIBUTIONS</div>
        <div class="row">
          <span>SSS</span>
          <span>{{  formatCurrency(p.sss) }}</span>
        </div>
        <div class="row">
          <span>PhilHealth</span>
          <span>{{  formatCurrency(p.philhealth) }}</span>
        </div>
        <div class="row">
          <span>Pag-ibig</span>
          <span>{{  formatCurrency(p.pagibig) }}</span>
        </div>

        <div class="row total">
          <strong>NET GROSS PAY</strong>
          <strong>{{  formatCurrency(p.net_gross_pay) }}</strong>
        </div>

        <!-- DEDUCTIONS -->
        <div style="margin-top: 6px; font-weight: bold;">DEDUCTIONS</div>
        <div class="row">
          <span>Withholding Tax</span>
          <span>{{  formatCurrency(p.withholding_tax) }}</span>
        </div>
        <div class="row">
          <span>SSS Loan</span>
          <span>{{  formatCurrency(p.sss_loan) }}</span>
        </div>
        <div class="row">
          <span>Pag-ibig Loan</span>
          <span>{{  formatCurrency(p.pagibig_loan) }}</span>
        </div>
        <div class="row">
          <span>Cash Advance</span>
          <span>{{  formatCurrency(p.cash_advance) }}</span>
        </div>
        <div class="row">
          <span>Health Card</span>
          <span>{{  formatCurrency(p.health_card) }}</span>
        </div>

        <div class="row total">
          <strong>NET PAY</strong>
          <strong>{{  formatCurrency(p.net_pay) }}</strong>
        </div>

        <div class="received_by mt-2">
          <span>Prepared by: <span>Elaiza</span></span>
        
        </div>
        <div >
          <span>Received by: </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
const props = defineProps({
  payslips: {
    type: Array,
    required: true
  }
})

// const downloadPdf = async () => {
//   const element = document.getElementById("print-area")

//   const canvas = await html2canvas(element, {
//     scale: 2,
//     useCORS: true
//   })
//   const imgData = canvas.toDataURL("image/png")
//   const pdf = new jsPDF("p", "mm", "a4")
//   const width = pdf.internal.pageSize.getWidth()
//   const height = pdf.internal.pageSize.getHeight()
//   pdf.addImage(imgData, "PNG", 0, 0, width, height)
//   pdf.save("payslip.pdf")
// }

// const downloadPdf = async () => {
//   const pdf = new jsPDF("p", "mm", "a4")
//   const width = pdf.internal.pageSize.getWidth()
//   const height = pdf.internal.pageSize.getHeight()

//   for (let i = 0; i < props.payslips.length; i++) {
//     // Create a temporary container for each payslip
//     const tempDiv = document.createElement("div")
//     tempDiv.style.width = "210mm"
//     tempDiv.style.height = "297mm"
//     tempDiv.style.padding = "5mm"
//     tempDiv.style.background = "white"
//     tempDiv.style.boxSizing = "border-box"

//     // Clone the payslip element from the DOM
//     const originalPayslip = document.querySelectorAll(".payslip-box")[i]
//     tempDiv.appendChild(originalPayslip.cloneNode(true))
//     document.body.appendChild(tempDiv)

//     // Render to canvas
//     const canvas = await html2canvas(tempDiv, { scale: 2, useCORS: true })
//     const imgData = canvas.toDataURL("image/png")

//     pdf.addImage(imgData, "PNG", 0, 0, width, height)

//     // Add a new page if not the last payslip
//     if (i < props.payslips.length - 1) pdf.addPage()

//     // Remove temporary div
//     document.body.removeChild(tempDiv)
//   }

//   pdf.save("payslips.pdf")
// }

// const downloadPdf = async () => {
//     // 1. Define constants for PDF and Print layout
//     const doc = new jsPDF('p', 'mm', 'a4');
//     const width = doc.internal.pageSize.getWidth();
//     const height = doc.internal.pageSize.getHeight();
//     const payslipsPerPage = 4;
//     const pdfPagesContainer = document.getElementById("pdf-pages");

//     pdfPagesContainer.innerHTML = '';
//     const allPayslipBoxes = document.querySelectorAll('.payslip-box');

//     // Grouping logic (same as before)
//     for (let i = 0; i < allPayslipBoxes.length; i += payslipsPerPage) {
//         const printPage = document.createElement('div');
//         printPage.className = 'print-grid';
//         printPage.style.display = 'grid'; 
        
//         for (let j = 0; j < payslipsPerPage; j++) {
//             if (allPayslipBoxes[i + j]) {
//                 printPage.appendChild(allPayslipBoxes[i + j].cloneNode(true));
//             }
//         }
//         pdfPagesContainer.appendChild(printPage);
//     }

//     await new Promise(resolve => setTimeout(resolve, 100));

//     // 2. Main processing loop
//     const pagesToPrint = document.querySelectorAll('#pdf-pages .print-grid');
    
//     for (let i = 0; i < pagesToPrint.length; i++) {
//         const pageElement = pagesToPrint[i];

//         // --- ATTENTION: New html2canvas Options ---
//         const canvas = await html2canvas(pageElement, {
//             scale: 2,
//             useCORS: true,
//             // Increase rendering timeout (milliseconds)
//             timeout: 5000, 
//             // Enable logging to the console (CRITICAL FOR DEBUGGING)
//             logging: true, 
//         });

//         const imgData = canvas.toDataURL("image/png");
        
//         // Final Check before adding to PDF
//         if (imgData.length < 100) {
//             console.error("html2canvas failed to create valid image data. Length is too short:", imgData.length);
//             // OPTIONAL: Return here or continue if you want to skip bad pages
//             // return; 
//         } else {
//             console.log("Image data successfully created. Length:", imgData.length);
//         }

//         if (i > 0) {
//             doc.addPage();
//         }

//         doc.addImage(imgData, "PNG", 0, 0, width, height);
//     }
    
//     // 3. Save and Clean up
//     doc.save("payslips_multipage.pdf");
//     pdfPagesContainer.innerHTML = ''; 
// };


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
    doc.save("payslips_2x2_grid.pdf");
    pdfPagesContainer.innerHTML = ''; 
};

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

.off-screen-temp-print {
  /* Move it far left so users don't see the flicker */
  position: absolute; 
  left: -9999px;
  /* Crucially, do NOT use display: none; */
}
</style>