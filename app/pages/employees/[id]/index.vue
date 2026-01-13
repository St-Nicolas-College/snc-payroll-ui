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
            <v-row dense>
              <v-col cols="5" class="font-weight-bold">Csco Rate</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ formatCurrency(employee.cisco_rate) }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="5" class="font-weight-bold">RLE Rate</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ formatCurrency(employee.rle_rate) }}
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
            <v-list-subheader class="font-weight-bold mt-2">Other Deductions</v-list-subheader>
            <v-row dense>
              <v-col cols="5" class="font-weight-bold">SSS Loan</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ formatCurrency(employee.sss_loan) }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="5" class="font-weight-bold">Pag-Ibig Loan</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">
                {{ formatCurrency(employee.pagibig_loan) }}
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-row dense>
              <v-col cols="6"><v-btn color="info" variant="flat" class="my-3" block prepend-icon="mdi-pencil"
                  @click="openEditDialog()"> Edit</v-btn></v-col>
              <v-col cols="6"> <v-btn color="red" variant="flat" class="my-3" block prepend-icon="mdi-delete"
                  @click="deleteEmployee()" :disabled="true"> Delete</v-btn></v-col>
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
          <v-tabs v-model="tab" align-tabs="left">
            <v-tab value="payslip" prepend-icon="mdi-clipboard-list">Payslips</v-tab>
            <v-tab value="cashAdvance" prepend-icon="mdi-account-cash">Cash Advance</v-tab>
          </v-tabs>
          <v-divider></v-divider>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="payslip">
              <v-card-title>
                <v-icon start>mdi-clipboard-list</v-icon> Payslips
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
                <template v-slot:[`item.basic_pay`]="{ item }">
                  {{ formatCurrency(item.basic_pay) }}
                </template>
                <template v-slot:[`item.gross_pay`]="{ item }">
                  {{ formatCurrency(item.gross_pay) }}
                </template>
                <template v-slot:[`item.net_gross_pay`]="{ item }">
                  {{ formatCurrency(item.net_gross_pay) }}
                </template>
                <template v-slot:[`item.net_pay`]="{ item }">
                  {{ formatCurrency(item.net_pay) }}
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn icon="mdi-file-search" variant="text" color="blue-grey" @click="previewPayslip(item)"></v-btn>
                </template>
              </v-data-table>
            </v-tabs-window-item>
          </v-tabs-window>

          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="cashAdvance">
              <v-card-title class="d-flex align-center">
                <v-icon start>mdi-account-cash</v-icon> Cash Advance
                <v-spacer></v-spacer>
                <v-btn prepend-icon="mdi-plus" color="primary" @click="cashAdvanceDialog = true">Cash Advance</v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <v-data-table density="compact" :headers="headersCashAdvance" :items="cashAdvances" :loading="loading">
                <template v-slot:loading>
                  <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
                </template>
                <template v-slot:[`item.cash_advance_amount`]="{ item }">
                  {{ formatCurrency(item.cash_advance_amount) }}
                </template>
                <template v-slot:[`item.date_applied`]="{ item }">
                  {{ formatDate(item.date_applied) }}
                </template>
                <template v-slot:[`item.total_cash_advance_payment`]="{ item }">
                  {{ formatCurrency(item.total_cash_advance_payment) }}
                </template>
                <template v-slot:[`item.remaining_balance`]="{ item }">
                  {{ formatCurrency(item.remaining_balance) }}
                </template>
                <template v-slot:[`item.date_completed`]="{ item }">
                  <div v-if="item.date_completed == null">
                    Not completed
                  </div>
                  <div v-else>
                    {{ formatDate(item.date_completed) }}
                  </div>
                </template>
                <template v-slot:[`item.cash_advance_status`]="{ item }">
                  <div v-if="item.cash_advance_status == 'PARTIAL'">
                    <v-chip color='warning' text='PARTIAL' class="text-uppercase" size="small" label></v-chip>
                  </div>
                  <div v-else>
                    <v-chip color='success' text='PAID' class="text-uppercase" size="small" label></v-chip>
                  </div>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn icon="mdi-file-cog" variant="text" color="blue-grey"
                    @click="openManageCashAdvanceDialog(item)"></v-btn>
                </template>
              </v-data-table>
            </v-tabs-window-item>
          </v-tabs-window>

        </v-card>


        <!-- MOBILE VIEW -->
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
                  <!-- <v-btn icon="mdi-open-in-new" variant="text" color="info"></v-btn> -->
                  <v-btn icon="mdi-file-search" variant="text" color="blue-grey"
                    @click="previewPayslip(payslip)"></v-btn>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- DIALOG BOX -->
    <v-dialog v-model="updateEmployeeDialog" width="800" scrollable>
      <v-card>
        <v-toolbar><v-toolbar-title>
            <v-icon start>mdi-pencil</v-icon>
            Update Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="updateEmployeeDialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form ref="updateEmployeeForm" v-model="formValid" class="mt-2">
            <p class="font-weight-bold mb-4"><v-icon start>mdi-account</v-icon> Employee Information</p>
            <v-row dense>
              <v-col cols="12" md="4"><v-text-field hide-details="auto" :rules="[rules.general]" label="Employee No"
                  v-model="editForm.emp_no" variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="8"><v-text-field hide-details="auto" :rules="[rules.general]" label="Employee Name"
                  v-model="editForm.emp_name" variant="solo-filled" flat></v-text-field></v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" md="6"><v-text-field label="Position" :rules="[rules.general]"
                  v-model="editForm.position" variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="6"><v-text-field label="Department" :rules="[rules.general]"
                  v-model="editForm.department" variant="solo-filled" flat></v-text-field></v-col>
            </v-row>
            <v-divider class="mb-4"></v-divider>
            <p class="font-weight-bold mb-4"><v-icon start>mdi-credit-card-outline</v-icon> Salary Information</p>
            <v-row dense>
              <v-col cols="12" md="4"><v-text-field hide-details="auto" :rules="[rules.general]" type="number"
                  prefix="₱" label="Basic Pay" v-model="editForm.basic_pay" variant="solo-filled"
                  flat></v-text-field></v-col>
              <v-col cols="12" md="4"><v-text-field hide-details="auto" type="number" prefix="₱" label="Honorarium"
                  v-model="editForm.honorarium" variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="4"><v-text-field hide-details="auto" type="number" prefix="₱" label="Premium"
                  v-model="editForm.premium" variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="4"><v-text-field hide-details="auto" type="number" prefix="₱" label="Amount Per Unit"
                  v-model="editForm.amount_per_unit" variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="4"><v-text-field hide-details="auto" type="number" prefix="₱" label="Cisco Rate"
                  v-model="editForm.cisco_rate" variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="4"><v-text-field hide-details="auto" type="number" prefix="₱" label="RLE Rate"
                  v-model="editForm.rle_rate" variant="solo-filled" flat></v-text-field></v-col>
            </v-row>
            <v-list-subheader class="font-weight-bold mt-2">Premiums</v-list-subheader>
            <v-row dense>
              <v-col cols="12" md="4"><v-text-field hide-details="auto" type="number" prefix="₱" label="SSS"
                  v-model="editForm.sss" variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="4"><v-text-field hide-details="auto" type="number" prefix="₱" label="Philhealth"
                  v-model="editForm.philhealth" variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="4"><v-text-field hide-details="auto" type="number" prefix="₱" label="Pag-Ibig"
                  v-model="editForm.pagibig" variant="solo-filled" flat></v-text-field></v-col>
            </v-row>
            <v-list-subheader class="font-weight-bold mt-2">Other Deductions</v-list-subheader>
            <v-row dense>
              <v-col cols="12" md="6"><v-text-field hide-details="auto" type="number" prefix="₱" label="SSS Loan"
                  v-model="editForm.sss_loan" variant="solo-filled" flat></v-text-field></v-col>
              <v-col cols="12" md="6"><v-text-field hide-details="auto" type="number" prefix="₱" label="Pag-Ibig Loan"
                  v-model="editForm.pagibig_loan" variant="solo-filled" flat></v-text-field></v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mt-2" color="primary" :loading="loadingBtn" :disabled="loadingBtn" @click="updateEmployee()"
            variant="elevated" type="submit">Update
            Details</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="previewPayslipDialog" max-width="800" scrollable>
      <v-card>
        <v-toolbar>
          <v-toolbar-title><v-icon start>mdi-file-search</v-icon> Preview Payslip</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="previewPayslipDialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>

        <v-divider></v-divider>
        <h3 class="text-center mt-5">Payroll Period</h3>
        <h4 class="text-center">{{ formatDate(payslipDetails.payroll_period.payroll_period_start)
          }} - {{ formatDate(payslipDetails.payroll_period.payroll_period_end)
          }}</h4>
        <v-divider class="mt-5"></v-divider>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" class="px-4">
              <p class="font-weight-bold mb-3 "><v-icon start>mdi-credit-card-outline</v-icon> Salary
                Information
              </p>

              <v-row>
                <v-col cols="12" md="6">
                  <v-row no-gutters>
                    <v-col cols="5">Basic Pay</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.basic_pay) }}
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5">Honorarium</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.honorarium) }}
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5">Premium</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.premium) }}
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5">Amount Per Unit</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.amount_per_unit) }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="6">
                  <v-row no-gutters>
                    <v-col cols="5">No. of Units</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ payslipDetails.no_of_units }}
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5">Units Total Amount</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.units_total_amount) }}
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5">Overtime</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.overtime) }}
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5">Late</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.late_deduction) }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-divider class="mt-2"></v-divider>
              <v-row no-gutters class="my-2">
                <v-col cols="5" md="3" class="font-weight-bold">Gross Pay</v-col>
                <v-col cols="1">:</v-col>
                <v-col cols="6" class="font-weight-bold">
                  {{ formatCurrency(payslipDetails.gross_pay) }}
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-list-subheader class="font-weight-bold mt-2">Premiums</v-list-subheader>
              <v-row>
                <v-col cols="12" md="6">
                  <v-row no-gutters>
                    <v-col cols="5">SSS</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.sss) }}
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5">Philhealth</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.philhealth) }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="6">
                  <v-row no-gutters>
                    <v-col cols="5">Pag-Ibig</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.pagibig) }}
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5">Total Premiums</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6" class="font-weight-bold">
                      {{ formatCurrency(totalPremiums) }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-divider class="mt-2"></v-divider>
              <v-row no-gutters class="my-2">
                <v-col cols="5" md="3" class="font-weight-bold">Net Gross Pay</v-col>
                <v-col cols="1">:</v-col>
                <v-col cols="6" class="font-weight-bold">
                  {{ formatCurrency(payslipDetails.net_gross_pay) }}
                </v-col>
              </v-row>
              <v-divider></v-divider>

              <v-list-subheader class="font-weight-bold mt-2">Other Deductions</v-list-subheader>
              <v-row>
                <v-col cols="12" md="6">

                  <v-row no-gutters>
                    <v-col cols="5">W/Hodling Tax</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.withholding_tax) }}
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5">SSS Loan</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.sss_loan) }}
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5">Pag-Ibig Loan</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.pagibig_loan) }}
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5">CA Amount</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.cash_advance_amount) }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="6">
                  <v-row no-gutters>
                    <v-col cols="5">CA Balance</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.cash_advance_balance) }}
                    </v-col>
                  </v-row>
                  <!-- <v-row no-gutters>
                      <v-col cols="5">CA New Balance</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(cashAdvanceNewBalance) }}</v-col>
                    </v-row> -->
                  <v-row no-gutters>
                    <v-col cols="5">CA Deduction</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.cash_advance_deduction) }}
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5">Health Card</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">
                      {{ formatCurrency(payslipDetails.health_card) }}
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5">Total Other Deductions</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6" class="font-weight-bold">
                      {{ formatCurrency(otherDeductionsTotal) }}

                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-divider class="mt-2"></v-divider>
              <v-row no-gutters class="my-2">
                <v-col cols="5" md="3" class="font-weight-bold total-netpay">Total Net Pay</v-col>
                <v-col cols="1">:</v-col>
                <v-col cols="6" md="6" class="font-weight-bold total-netpay">
                  {{ formatCurrency(payslipDetails.net_pay) }}
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>


    <!-- CASH ADVANCE DIALOG -->
    <v-dialog v-model="cashAdvanceDialog" width="500">
      <v-card>
        <v-toolbar><v-toolbar-title>
            <v-icon start>mdi-account-cash</v-icon>
            Add Cash Advance</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="cashAdvanceDialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <div class="ma-6">
          <v-form ref="addCashAdvanceForm" v-model="formValid" class="mt-2">
            <v-text-field hide-details="auto" :rules="[rules.general]" type="number" prefix="₱" label="Amount"
              v-model="cashAdvanceForm.amount" variant="solo-filled" flat></v-text-field>


            <v-btn prepend-icon="mdi-plus" color="primary" class="mt-6" :loading="loadingCABtn" :disabled="loadingCABtn"
              @click="createCashAdvance" block>Create</v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="manageCashAdvanceDialog" width="900">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>
            <v-icon start>mdi-account-cash</v-icon>
            Manage Cash Advance
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="manageCashAdvanceDialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <p class="font-weight-bold mb-4">Cash Advance Details</p>

              <v-row dense>
                <v-col cols="5" class="font-weight-bold">Date Applied</v-col>
                <v-col cols="1">:</v-col>
                <v-col cols="5">
                  {{ formatDate(cashAdvanceDetails.date_applied) }}
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="5" class="font-weight-bold">Amount</v-col>
                <v-col cols="1">:</v-col>
                <v-col cols="5">
                  {{ formatCurrency(cashAdvanceDetails.cash_advance_amount) }}
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="5" class="font-weight-bold">Total Amount Paid</v-col>
                <v-col cols="1">:</v-col>
                <v-col cols="5">
                  {{ formatCurrency(cashAdvanceDetails.total_cash_advance_payment) }}
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="5" class="font-weight-bold">Remaining Balance</v-col>
                <v-col cols="1">:</v-col>
                <v-col cols="6">
                  {{ formatCurrency(cashAdvanceDetails.remaining_balance) }}
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="5" class="font-weight-bold">Date Updated</v-col>
                <v-col cols="1">:</v-col>
                <v-col cols="5">
                  <div v-if="cashAdvanceDetails.date_updated !== null">
                    {{ formatDate(cashAdvanceDetails.date_updated) }}
                  </div>
                  <div v-else>N/A</div>

                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="5" class="font-weight-bold">Date Completed</v-col>
                <v-col cols="1">:</v-col>
                <v-col cols="5">
                  <div v-if="cashAdvanceDetails.date_completed !== null">
                    {{ formatDate(cashAdvanceDetails.date_completed) }}
                  </div>
                  <div v-else>
                    N/A
                  </div>

                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="5" class="font-weight-bold">Status</v-col>
                <v-col cols="1">:</v-col>
                <v-col cols="5">
                  <!-- {{ cashAdvanceDetails.cash_advance_status }} -->

                  <div v-if="cashAdvanceDetails.cash_advance_status == 'PARTIAL'">
                    <v-chip color='warning' text='PARTIAL' class="text-uppercase" size="small" label></v-chip>
                  </div>
                  <div v-else>
                    <v-chip color='success' text='PAID' class="text-uppercase" size="small" label></v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="12" md="5">
              <v-row>
                <v-col cols="12">
                  <span class="text-overline font-weight-bold">Update cash advance amount</span>
                  <v-btn v-if="disabledUpdateCA == true" color="warning" variant="text" size="small"
                    @click="disabledUpdateCA = false" icon><v-icon>mdi-pencil</v-icon></v-btn>
                  <v-btn v-if="disabledUpdateCA == false" color="error" variant="text" size="small"
                    @click="disabledUpdateCA = true" icon><v-icon>mdi-close</v-icon></v-btn>
                  <v-form class="mt-2" ref="updateCashAdvanceForm" v-model="formValid" lazy-validation>
                    <v-text-field hide-details="auto" :rules="[rules.general]" type="number" prefix="₱" label="Amount"
                      :disabled="disabledUpdateCA" v-model="cashAdvanceDetails.cash_advance_amount"
                      variant="solo-filled" flat></v-text-field>
                    <v-btn color="primary" variant="elevated" class="mt-4" :loading="loadingCABtn"
                      :disabled="disabledUpdateCA" @click="updateCAAmount()" block>Update
                      Amount</v-btn>
                  </v-form>
                </v-col>
              </v-row>

            </v-col>
          </v-row>
          <v-divider class="mt-5"></v-divider>
          <v-row>
            <v-col cols="12">
              <v-card elevation="0" class="mt-5">
                <v-card-title>Payment Details</v-card-title>

                <v-data-table density="compact" :headers="caPaymentsHeader"
                  :items="cashAdvanceDetails.cash_advance_payments">
                  <template v-slot:[`item.cash_advance_payment`]="{ item }">
                    {{ formatCurrency(item.cash_advance_payment) }}
                  </template>
                  <template v-slot:[`item.payment_date`]="{ item }">
                    {{ formatDate(item.payment_date) }}
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
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
const updateEmployeeDialog = ref(false)
const previewPayslipDialog = ref(false);
const cashAdvanceDialog = ref(false);
const manageCashAdvanceDialog = ref(false)
const employee = ref({})
const payslips = ref([])
const cashAdvances = ref([])
const toalCashAdvancePayment = ref([])
const loading = ref(false)
const loadingCABtn = ref(false)
const formValid = ref(null)
const tab = ref("payslip")
const disabledUpdateCA = ref(true)
const headers = [
  { title: 'Payroll Period', key: 'payroll_period' },
  { title: 'Basic Pay', key: 'basic_pay', sortable: false },
  { title: 'Gross Pay', key: 'gross_pay', sortable: false },
  { title: 'Net Gross Pay', key: 'net_gross_pay', sortable: false },
  { title: 'Net Pay', key: 'net_pay', sortable: false },
  { title: '', key: 'actions', align: 'end', sortable: false },
]
const headersCashAdvance = [
  { title: 'Amount', key: 'cash_advance_amount' },
  { title: 'Date Applied', key: 'date_applied', sortable: false },
  { title: 'Total Amount Paid', key: 'total_cash_advance_payment', sortable: false },
  { title: 'Remaining Balance', key: 'remaining_balance', sortable: false },
  { title: 'Date Completed', key: 'date_completed', sortable: false },
  { title: 'Status', key: 'cash_advance_status', sortable: false },
  { title: '', key: 'actions', align: 'end', sortable: false },
]
const caPaymentsHeader = [
  { title: 'Amount Paid', key: 'cash_advance_payment' },
  { title: 'Payment Date', key: 'payment_date' },
]
const rules = {
  general: (v) => !!v || "This field is required",
}
const addCashAdvanceForm = ref(null)
const loadingBtn = ref(false)
const updateEmployeeForm = ref(null)
const updateCashAdvanceForm = ref(null)
const cashAdvanceForm = ref({
  amount: 0
})
const editForm = ref({
  emp_no: '',
  emp_name: '',
  position: '',
  department: '',
  basic_pay: 0,
  honorarium: 0,
  premium: 0,
  amount_per_unit: 0,
  cisco_rate: 0,
  rle_rate: 0,
  sss: 0,
  philhealth: 0,
  pagibig: 0,
  sss_loan: 0,
  pagibig_loan: 0
})
const payslipDetails = ref({})
const cashAdvanceDetails = ref({})

const fetchEmployeeDetails = async () => {
  try {
    const query = qs.stringify({
      populate: {
        payslips: {
          populate: ['payroll_period']
        },
        cash_advances: {
          populate: '*'
        }
      }
    })
    const res = await $fetch(`${baseUrl}/api/employees/${route.params.id}?${query}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    if (res) {
      //console.log("Successfully fetched..", res.data)
      employee.value = res.data
      payslips.value = res.data.payslips
      //cashAdvances.value = res.data.cash_advances
      cashAdvances.value = res.data.cash_advances.map(ca => {
        const payments = ca.cash_advance_payments || []

        const totalPayment = payments.reduce(
          (sum, p) => sum + Number(p.cash_advance_payment ?? 0),
          0
        )

        const amount = Number(ca.cash_advance_amount ?? 0)
        const remainingBalance = Number(ca.cash_advance_amount ?? 0) - totalPayment

        let status = 'PENDING'
        if (remainingBalance === 0) status = 'PAID'
        else if (remainingBalance <= amount) status = 'PARTIAL'

        return {
          ...ca,
          total_cash_advance_payment: totalPayment,
          remaining_balance: remainingBalance,
          cash_advance_status: status
        }
      })
      console.log("Total Payment: ", cashAdvances.value)
    }
  } catch (err) {
    console.log('Failed to fetch data.', err)
    throw err;
  }
}

function openEditDialog() {
  editForm.value = {
    emp_no: employee.value?.employee_no,
    emp_name: employee.value?.employee_name,
    position: employee.value?.position,
    department: employee.value?.department,
    basic_pay: employee.value?.basic_pay,
    honorarium: employee.value?.honorarium,
    premium: employee.value?.premium,
    amount_per_unit: employee.value?.amount_per_unit,
    cisco_rate: employee.value?.cisco_rate,
    rle_rate: employee.value?.rle_rate,
    sss: employee.value?.sss,
    philhealth: employee.value?.philhealth,
    pagibig: employee.value?.pagibig,
    sss_loan: employee.value?.sss_loan,
    pagibig_loan: employee.value?.pagibig_loan,
  }

  updateEmployeeDialog.value = true
}

const updateEmployee = async () => {
  loadingBtn.value = true
  const { valid } = await updateEmployeeForm.value.validate();
  if (!valid) return
  try {

    await $fetch(`${baseUrl}/api/employees/${route.params.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: {
        data: {
          employee_no: editForm.value.emp_no,
          employee_name: editForm.value?.emp_name,
          position: editForm.value?.position,
          department: editForm.value?.department,
          basic_pay: editForm.value?.basic_pay,
          honorarium: editForm.value?.honorarium,
          premium: editForm.value?.premium,
          amount_per_unit: editForm.value?.amount_per_unit,
          cisco_rate: editForm.value?.cisco_rate,
          rle_rate: editForm.value?.rle_rate,
          sss: editForm.value?.sss,
          philhealth: editForm.value?.philhealth,
          pagibig: editForm.value?.pagibig,
          sss_loan: editForm.value?.sss_loan,
          pagibig_loan: editForm.value?.pagibig_loan

        }
      },
    })
    loadingBtn.value = false
    fetchEmployeeDetails()
    updateEmployeeDialog.value = false
    alert("Employee details updated successfully!")
  } catch (err) {
    loadingBtn.value = false
    console.error('Error updating..', err)
  } finally {
    loadingBtn.value = false
  }
}

// Create Cash Advance
const createCashAdvance = async () => {
  loadingCABtn.value = true
  const isValid = await addCashAdvanceForm.value?.validate();
  if (isValid.valid) {
    try {
      const today = new Date().toISOString().split('T')[0]
      const data = await $fetch(`${baseUrl}/api/cash-advances`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: {
          data: {
            employee: route.params.id,
            cash_advance_amount: cashAdvanceForm.value.amount,
            date_applied: today
          }
        }
      })
      loadingCABtn.value = false
      console.log("Successfully Created");
      alert(`Cash Advance amounting to ${cashAdvanceForm.value.amount} successfully added!`)
      addCashAdvanceForm.value?.reset()
      fetchEmployeeDetails();
      cashAdvanceDialog.value = false

    } catch (err) {
      loadingCABtn.value = false
      const message = err?.response?._data?.error?.message || "Unknown error";
      console.log("Error message: ", message)
    } finally {
      loadingCABtn.value = false
    }
  }
}

// Open Manage Cash Advance dialog
const openManageCashAdvanceDialog = async (item) => {
  console.log("Cash Advance Details: ", item)
  cashAdvanceDetails.value = item
  manageCashAdvanceDialog.value = true
}

const updateCAAmount = async () => {
  loadingCABtn.value = true
  console.log("New Amount: ", Number(cashAdvanceDetails.value.cash_advance_amount))
  const isValid = await updateCashAdvanceForm.value?.validate();
  if (isValid.valid) {
    try {
      const today = new Date().toISOString().split('T')[0]
      const data = await $fetch(`${baseUrl}/api/cash-advances/${cashAdvanceDetails.value?.documentId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: {
          data: {
            cash_advance_amount: Number(cashAdvanceDetails.value.cash_advance_amount),
            date_updated: today
          }
        }
      })
      loadingCABtn.value = false
      disabledUpdateCA.value = true
      alert(`Cash advance amount update to ${cashAdvanceDetails.value.cash_advance_amount}`)
      fetchEmployeeDetails();
    } catch (err) {
      const message = err?.response?._data?.error?.message || "Unknown error";
      console.log("Error message: ", message)
      loadingCABtn.value = false
    } finally {
      loadingCABtn.value = false
    }

  }
}

// Preview payslip
const previewPayslip = async (item) => {
  previewPayslipDialog.value = true
  payslipDetails.value = item
  //console.log("Preview Payslip: ", item)
}

const deleteEmployee = async (item) => {
  alert("No function")
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

const totalPremiums = computed(() => {
  return Number(payslipDetails.value.sss) + Number(payslipDetails.value.philhealth) + Number(payslipDetails.value.pagibig)
})

const otherDeductionsTotal = computed(() => {
  return Number([payslipDetails.value.withholding_tax]) + Number(payslipDetails.value.sss_loan) + Number(payslipDetails.value.pagibig_loan) + Number(payslipDetails.value.cash_advance_deduction) + Number(payslipDetails.value.health_card)
})

onMounted(async () => {
  await fetchEmployeeDetails();
})

</script>

<style></style>
