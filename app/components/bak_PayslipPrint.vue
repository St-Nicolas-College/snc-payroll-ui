<template>
  <div style="
      width: 210mm;
      padding: 10mm;
      background: white;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, auto);
      gap: 8mm;
    ">
    <!-- <div v-for="item in payslip" :key="item">
      <pre>{{ item.basic_pay }}</pre>
    </div> -->

    <template v-for="payslip in payslip" :key="payslip">
      <div style="border: 1px solid black; padding: 8px; font-size: 11px;">
        
        <!-- HEADER -->
        <div style="text-align: center; font-weight: bold; border-bottom: 1px solid black; padding-bottom: 4px;">
          PAYSLIP
        </div>

        <!-- Employee Info -->
        <div style="padding-top: 4px;">
          <strong>Employee:</strong> {{ payslip.employee?.employee_name }} <br>
          <strong>Employee No.:</strong> {{ payslip.employee?.employee_no }} <br>
          <strong>Payroll Period:</strong> {{ payslip.payroll_period.payroll_period_start }}
        </div>

        <div style="margin-top: 6px; border-top: 1px solid black;"></div>

        <!-- EARNINGS SECTION -->
        <div style="margin-top: 4px; font-weight: bold;">EARNINGS</div>
        <div class="row">
          <span>Basic Pay</span>
          <span>{{ payslip.basic_pay }}</span>
        </div>
        <div class="row">
          <span>Honorarium</span>
          <span>{{ payslip.honorarium }}</span>
        </div>
        <div class="row">
          <span>Premium</span>
          <span>{{ payslip.premium }}</span>
        </div>
        <div class="row">
          <span>Extra Loads</span>
          <span>{{ payslip.extra_loads }}</span>
        </div>
        <div class="row">
          <span>Overtime</span>
          <span>{{ payslip.overtime }}</span>
        </div>
        <div class="row">
          <span>(Less) Late</span>
          <span>{{ payslip.late_deduction }}</span>
        </div>

        <div class="row total">
          <strong>TOTAL GROSS PAY</strong>
          <strong>{{ payslip.gross_pay }}</strong>
        </div>

        <!-- CONTRIBUTIONS -->
        <div style="margin-top: 6px; font-weight: bold;">CONTRIBUTIONS</div>
        <div class="row">
          <span>SSS</span>
          <span>{{ payslip.sss }}</span>
        </div>
        <div class="row">
          <span>PhilHealth</span>
          <span>{{ payslip.philhealth }}</span>
        </div>
        <div class="row">
          <span>Pag-ibig</span>
          <span>{{ payslip.pagibig }}</span>
        </div>

        <div class="row total">
          <strong>NET GROSS PAY</strong>
          <strong>{{ payslip.net_gross_pay }}</strong>
        </div>

        <!-- DEDUCTIONS -->
        <div style="margin-top: 6px; font-weight: bold;">DEDUCTIONS</div>
        <div class="row">
          <span>Withholding Tax</span>
          <span>{{ payslip.withholding_tax }}</span>
        </div>
        <div class="row">
          <span>SSS Loan</span>
          <span>{{ payslip.sss_loan }}</span>
        </div>
        <div class="row">
          <span>Pag-ibig Loan</span>
          <span>{{ payslip.pagibig_loan }}</span>
        </div>
        <div class="row">
          <span>Cash Advance</span>
          <span>{{ payslip.cash_advance }}</span>
        </div>
        <div class="row">
          <span>Health Card</span>
          <span>{{ payslip.health_card }}</span>
        </div>

        <div class="row total">
          <strong>NET PAY</strong>
          <strong>{{ payslip.net_pay }}</strong>
        </div>
      </div>
    </template>

  </div>
</template>

<script setup>
defineProps({
  payslip: {
    type: Object,
    required: true
  }
})
</script>
<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dotted gray;
  padding: 2px 0;
}

.total {
  background: #eaeaea;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-top: 4px;
  padding: 2px 0;
}
</style>