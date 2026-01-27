<template>
  <div>
    <v-pull-to-refresh @load="onRefresh">
      <AppBreadcrumb :breadcrumbs="breadcrumbItems" theme="light" class="mb-3" />
      <v-card elevation="0" rounded="lg" class="mt-5" v-if="noRecordFound">
        <h1 class="text-center pa-8">No Record Found</h1>
      </v-card>
      <div v-else>
        <v-card elevation="0" rounded="lg" class="mt-5">
          <v-card elevation="0" class="pa-4">
            <v-row align="center" dense>
              <!-- LEFT: TITLE -->
              <v-col cols="12" md="6" class="d-flex align-center">
                <v-icon start>mdi-cash-clock</v-icon>
                <span class="text-h6 font-weight-medium">
                  Payroll Details
                </span>
              </v-col>
             

              <!-- RIGHT: ACTION BUTTONS -->
              <v-col cols="12" md="6" class="d-flex justify-end" :class="smAndDown ? 'flex-column ga-2' : 'ga-2'">
                <v-menu open-on-hover>
                  <template v-slot:activator="{ props }">
                    <v-btn prepend-icon="mdi-printer" class="text-capitalize" color="info" v-bind="props">
                      Print Payroll
                    </v-btn>
                  </template>

                  <v-list density="compact" class="py-0" item-props slim>
                    <v-list-item @click="openPrintPayrollWindow('atm')">
                      <template v-slot:prepend>
                        <v-icon>mdi-credit-card</v-icon>
                      </template>
                      <v-list-item-title>ATM</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item @click="openPrintPayrollWindow('cash')">
                      <template v-slot:prepend>
                        <v-icon>mdi-cash</v-icon>
                      </template>
                      <v-list-item-title>Cash</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <!-- <v-btn color="info" class="text-capitalize" prepend-icon="mdi-printer" :block="smAndDown"
                  @click="openPrintPayrollWindow">
                  Print Payroll
                </v-btn> -->

                <v-btn color="teal" class="text-capitalize" prepend-icon="mdi-printer" :block="smAndDown"
                  @click="openPrintPayslipWindow">
                  Print Payslip
                </v-btn>

                <v-btn color="success" class="text-capitalize" prepend-icon="mdi-plus" :block="smAndDown"
                  @click="openEmployeeDialog">
                  Add Employee Payroll
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="12">
                <v-row dense>
                  <v-col cols="12" md="4">
                    <v-row dense>
                      <v-col cols="12">
                        <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                          <v-row dense>
                            <v-col cols="7" class="font-weight-bold"> Payroll Cover Start:</v-col>
                            <v-col cols="5"> {{ formatDate(payrollDetails.payroll_period_start)
                              }}</v-col>
                          </v-row>
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="12">
                        <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                          <v-row dense>
                            <v-col cols="7" class="font-weight-bold"> Payroll Cover End:</v-col>
                            <v-col cols="5"> {{ formatDate(payrollDetails.payroll_period_end)
                              }}</v-col>
                          </v-row>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-row dense>
                      <v-col cols="12">
                        <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                          <v-row dense>
                            <v-col cols="7" class="font-weight-bold"> Pay Date:</v-col>
                            <v-col cols="5"> {{ formatDate(payrollDetails.pay_date)
                              }}</v-col>
                          </v-row>
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="12">
                        <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                          <v-row dense>
                            <v-col cols="7" class="font-weight-bold"> Cut-Off Type:</v-col>
                            <v-col cols="5">
                              <div v-if="payrollDetails.cut_off_type == 'first_half'">15th (Kinsenas)</div>
                              <div v-if="payrollDetails.cut_off_type == 'second_half'">30th (Katapusan)</div>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-row dense>
                      <v-col cols="12">
                        <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                          <v-row dense>
                            <v-col cols="7" class="font-weight-bold"> Payroll Created:</v-col>
                            <v-col cols="5">
                              {{ formatDate(payrollDetails.createdAt)
                              }}
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="12">
                        <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                          <v-row dense>
                            <v-col cols="7" class="font-weight-bold"> Created by:</v-col>
                            <v-col cols="5">
                              {{ payrollDetails.user_info?.first_name }} {{ payrollDetails.user_info?.last_name }}
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-sheet class="mt-5">
          <v-tabs color="primary" v-model="payrollDetailsTab">
            <v-tab value="atm">ATM</v-tab>
            <v-tab value="cash">CASH</v-tab>
          </v-tabs>

          <v-divider></v-divider>

          <v-tabs-window v-model="payrollDetailsTab">
            <v-tabs-window-item value="atm">
              <v-card elevation="0" rounded="lg">
                <v-card-title class="d-flex align-center pe-2">
                  <!-- Grand Total: {{ formatCurrency(totalNetPay) }}
                  <v-spacer></v-spacer> -->
                  Grand Total (ATM): {{ formatCurrency(totalATMNetPay) }}
                  <!-- <v-spacer></v-spacer>
                  Grand Total (Cash): {{ formatCurrency(totalCashNetPay) }} -->
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
                    variant="solo-filled" flat hide-details single-line></v-text-field>
                </v-card-title>
                <v-divider></v-divider>

                <v-data-table density="compact" :items-per-page="-1" :hide-default-footer="false" :headers="header"
                  :items="atmPayslips" :search="search" :loading="loading">
                  <template v-slot:[`item.basic_pay`]="{ item }">
                    {{ formatCurrency(item.basic_pay) }}
                  </template>
                  <template v-slot:[`item.honorarium`]="{ item }">
                    {{ formatCurrency(item.honorarium) }}
                  </template>
                  <template v-slot:[`item.premium`]="{ item }">
                    {{ formatCurrency(item.premium) }}
                  </template>
                  <template v-slot:[`item.units_total_amount`]="{ item }">
                    {{ formatCurrency(item.units_total_amount) }}
                  </template>
                  <template v-slot:[`item.cisco_total_amount`]="{ item }">
                    {{ formatCurrency(item.cisco_total_amount) }}
                  </template>
                  <template v-slot:[`item.rle_total_amount`]="{ item }">
                    {{ formatCurrency(item.rle_total_amount) }}
                  </template>
                  <template v-slot:[`item.overtime`]="{ item }">
                    {{ formatCurrency(item.overtime) }}
                  </template>
                  <template v-slot:[`item.late_deduction`]="{ item }">
                    {{ formatCurrency(item.late_deduction) }}
                  </template>
                  <template v-slot:[`item.gross_pay`]="{ item }">
                    <div class="font-weight-bold"> {{ formatCurrency(item.gross_pay) }}</div>
                  </template>
                  <template v-slot:[`item.sss`]="{ item }">
                    {{ formatCurrency(item.sss) }}
                  </template>
                  <template v-slot:[`item.philhealth`]="{ item }">
                    {{ formatCurrency(item.philhealth) }}
                  </template>
                  <template v-slot:[`item.pagibig`]="{ item }">
                    {{ formatCurrency(item.pagibig) }}
                  </template>
                  <template v-slot:[`item.net_gross_pay`]="{ item }">
                    <div class="font-weight-bold">{{ formatCurrency(item.net_gross_pay) }}</div>
                  </template>
                  <template v-slot:[`item.withholding_tax`]="{ item }">
                    {{ formatCurrency(item.withholding_tax) }}
                  </template>
                  <template v-slot:[`item.sss_loan`]="{ item }">
                    {{ formatCurrency(item.sss_loan) }}
                  </template>
                  <template v-slot:[`item.pagibig_loan`]="{ item }">
                    {{ formatCurrency(item.pagibig_loan) }}
                  </template>
                  <template v-slot:[`item.cash_advance_deduction`]="{ item }">
                    {{ formatCurrency(item.cash_advance_deduction) }}
                  </template>
                  <template v-slot:[`item.health_card`]="{ item }">
                    {{ formatCurrency(item.health_card) }}
                  </template>
                  <template v-slot:[`item.net_pay`]="{ item }">
                    <div class="font-weight-bold">{{ formatCurrency(item.net_pay) }}</div>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
                    <!-- <v-btn size="small" class="mr-1" icon="mdi-account-cog-outline" variant="tonal" color="blue"
              :to="`/employees/${item.documentId}`"></v-btn> -->
                    <v-btn size="small" class="mr-1" variant="tonal" color="info"
                      :to="`/payroll/${route.params.id}/manage/${item.documentId}`"><v-icon>mdi-account-cog-outline</v-icon></v-btn>
                  </template>
                </v-data-table>

              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item value="cash">
              <v-card elevation="0" rounded="lg">
                <v-card-title class="d-flex align-center pe-2">
                  <!-- Grand Total: {{ formatCurrency(totalNetPay) }}
                  <v-spacer></v-spacer> -->
                  <!-- Grand Total (ATM): {{ formatCurrency(totalATMNetPay) }}
                  <v-spacer></v-spacer> -->
                  Grand Total (Cash): {{ formatCurrency(totalCashNetPay) }}
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
                    variant="solo-filled" flat hide-details single-line></v-text-field>
                </v-card-title>
                <v-divider></v-divider>

                <v-data-table density="compact" :items-per-page="-1" :hide-default-footer="false" :headers="header"
                  :items="cashPayslips" :search="search" :loading="loading">
                  <template v-slot:[`item.basic_pay`]="{ item }">
                    {{ formatCurrency(item.basic_pay) }}
                  </template>
                  <template v-slot:[`item.honorarium`]="{ item }">
                    {{ formatCurrency(item.honorarium) }}
                  </template>
                  <template v-slot:[`item.premium`]="{ item }">
                    {{ formatCurrency(item.premium) }}
                  </template>
                  <template v-slot:[`item.units_total_amount`]="{ item }">
                    {{ formatCurrency(item.units_total_amount) }}
                  </template>
                  <template v-slot:[`item.cisco_total_amount`]="{ item }">
                    {{ formatCurrency(item.cisco_total_amount) }}
                  </template>
                  <template v-slot:[`item.rle_total_amount`]="{ item }">
                    {{ formatCurrency(item.rle_total_amount) }}
                  </template>
                  <template v-slot:[`item.overtime`]="{ item }">
                    {{ formatCurrency(item.overtime) }}
                  </template>
                  <template v-slot:[`item.late_deduction`]="{ item }">
                    {{ formatCurrency(item.late_deduction) }}
                  </template>
                  <template v-slot:[`item.gross_pay`]="{ item }">
                    <div class="font-weight-bold"> {{ formatCurrency(item.gross_pay) }}</div>
                  </template>
                  <template v-slot:[`item.sss`]="{ item }">
                    {{ formatCurrency(item.sss) }}
                  </template>
                  <template v-slot:[`item.philhealth`]="{ item }">
                    {{ formatCurrency(item.philhealth) }}
                  </template>
                  <template v-slot:[`item.pagibig`]="{ item }">
                    {{ formatCurrency(item.pagibig) }}
                  </template>
                  <template v-slot:[`item.net_gross_pay`]="{ item }">
                    <div class="font-weight-bold">{{ formatCurrency(item.net_gross_pay) }}</div>
                  </template>
                  <template v-slot:[`item.withholding_tax`]="{ item }">
                    {{ formatCurrency(item.withholding_tax) }}
                  </template>
                  <template v-slot:[`item.sss_loan`]="{ item }">
                    {{ formatCurrency(item.sss_loan) }}
                  </template>
                  <template v-slot:[`item.pagibig_loan`]="{ item }">
                    {{ formatCurrency(item.pagibig_loan) }}
                  </template>
                  <template v-slot:[`item.cash_advance_deduction`]="{ item }">
                    {{ formatCurrency(item.cash_advance_deduction) }}
                  </template>
                  <template v-slot:[`item.health_card`]="{ item }">
                    {{ formatCurrency(item.health_card) }}
                  </template>
                  <template v-slot:[`item.net_pay`]="{ item }">
                    <div class="font-weight-bold">{{ formatCurrency(item.net_pay) }}</div>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
                    <!-- <v-btn size="small" class="mr-1" icon="mdi-account-cog-outline" variant="tonal" color="blue"
              :to="`/employees/${item.documentId}`"></v-btn> -->
                    <v-btn size="small" class="mr-1" variant="tonal" color="info"
                      :to="`/payroll/${route.params.id}/manage/${item.documentId}`"><v-icon>mdi-account-cog-outline</v-icon></v-btn>

                  </template>
                </v-data-table>

              </v-card>
            </v-tabs-window-item>

          </v-tabs-window>
        </v-sheet>




      </div>

      <!-- <PayslipPrint :payslip="payrollDetails.payslips" /> -->


      <v-dialog v-model="createEmployeePayrollDialog" transition="dialog-bottom-transition" fullscreen scrollable>
        <v-card>
          <v-toolbar>
            <v-btn icon="mdi-close" @click="closeCreateEmployeePayrollDialog"></v-btn>
            <v-toolbar-title>Payroll Enlistment</v-toolbar-title>
            <!-- <v-btn color="primary" variant="flat"><v-icon start>mdi-content-save</v-icon> Save</v-btn> -->
            <v-toolbar-items>
              <v-btn color="warning" variant="flat" @click="resetFormCreateEmployee"><v-icon
                  start>mdi-lock-reset</v-icon>
                Reset</v-btn>
              <v-btn color="primary" variant="flat" @click="submitForm">
                <v-icon start>mdi-content-save</v-icon>
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>

            <h3 class="text-center">Payroll Period</h3>
            <h4 class="text-center">{{ formatDate(payrollDetails.payroll_period_start)
              }} - {{ formatDate(payrollDetails.payroll_period_end)
              }}</h4>
            <div v-if="payrollDetails.cut_off_type == 'first_half'">
              <h4 class="text-center">15th (Kinsenas)</h4>
            </div>
            <div v-if="payrollDetails.cut_off_type == 'second_half'">
              <h4 class="text-center">30th (Katapusan)</h4>
            </div>

            <v-divider class="my-4"></v-divider>
            <v-form ref="payrollEnlistmentForm" v-model="formValid" lazy-validation>

              <v-row dense>


                <v-col cols="12" md="6" class="ml-4">

                  <p class="font-weight-bold mb-4"><v-icon start>mdi-account</v-icon> Employee Information</p>

                  <v-row no-gutters>
                    <v-col cols="5" md="3" class="font-weight-bold">Employee Name</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">{{ employeeName }}</v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5" md="3" class="font-weight-bold">Position</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">{{ position }}</v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="5" md="3" class="font-weight-bold">Department</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6">{{ department }}</v-col>
                  </v-row>
                  <v-divider class="my-4"></v-divider>
                  <p class="font-weight-bold mb-3 mt-5"><v-icon start>mdi-credit-card-outline</v-icon> Salary
                    Information
                  </p>

                  <v-row>
                    <v-col cols="12" md="6">
                      <v-row no-gutters>
                        <v-col cols="5">Basic Pay</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(basicPay) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">Honorarium</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(honorarium) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">Premium</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(premium) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">Amount Per Unit</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(amountPerUnit) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">Cisco Rate</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(ciscoRate) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">RLE Rate</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(rleRate) }}</v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-row no-gutters>
                        <v-col cols="5">No. of Units</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ noOfUnits }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">Cisco No. of Units</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ ciscoNoOfUnits }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">RLE No. of Units</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ rleNoOfUnits }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">Units Total Amount</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(unitsTotalAmount) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">Cisco Total Amount</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(ciscoTotalAmount) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">RLE Total Amount</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(rleTotalAmount) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">Overtime</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(overtime) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">Late</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(late) }}</v-col>
                      </v-row>
                    </v-col>
                  </v-row>


                  <v-divider class="mt-2"></v-divider>
                  <v-row no-gutters class="my-2">
                    <v-col cols="5" md="3" class="font-weight-bold">Gross Pay</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6" class="font-weight-bold">{{ formatCurrency(grossPay) }}</v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-list-subheader class="font-weight-bold mt-2">Premiums</v-list-subheader>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-row no-gutters>
                        <v-col cols="5">SSS</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(sss) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">Philhealth</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(philhealth) }}</v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-row no-gutters>
                        <v-col cols="5">Pag-Ibig</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(pagibig) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">Total Premiums</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6" class="font-weight-bold">{{ formatCurrency(totalPremiums) }}</v-col>
                      </v-row>
                    </v-col>
                  </v-row>



                  <v-divider class="mt-2"></v-divider>
                  <v-row no-gutters class="my-2">
                    <v-col cols="5" md="3" class="font-weight-bold">Net Gross Pay</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6" class="font-weight-bold">{{ formatCurrency(netGrossPay) }}</v-col>
                  </v-row>
                  <v-divider></v-divider>

                  <v-list-subheader class="font-weight-bold mt-2">Other Deductions</v-list-subheader>
                  <v-row>
                    <v-col cols="12" md="6">

                      <v-row no-gutters>
                        <v-col cols="5">W/Hodling Tax</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(withHoldingTax) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">SSS Loan</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(sssLoan) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">Pag-Ibig Loan</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(pagibigLoan) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">CA Amount</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(cashAdvanceAmount) }}</v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-row no-gutters>
                        <v-col cols="5">CA Balance</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(cashAdvanceBalance) }}</v-col>
                      </v-row>
                      <!-- <v-row no-gutters>
                      <v-col cols="5">CA New Balance</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="6">{{ formatCurrency(cashAdvanceNewBalance) }}</v-col>
                    </v-row> -->
                      <v-row no-gutters>
                        <v-col cols="5">CA Deduction</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(cashAdvanceDeduction) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">Health Card</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6">{{ formatCurrency(healthCard) }}</v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5">Total Other Deductions</v-col>
                        <v-col cols="1">:</v-col>
                        <v-col cols="6" class="font-weight-bold">{{ formatCurrency(otherDeductionsTotal) }}</v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                  <v-divider class="mt-2"></v-divider>
                  <v-row no-gutters class="my-2">
                    <v-col cols="5" md="3" class="font-weight-bold text-h6 total-netpay">Total Net Pay</v-col>
                    <v-col cols="1">:</v-col>
                    <v-col cols="6" class="font-weight-bold text-h6 total-netpay">{{ formatCurrency(netPay) }}</v-col>
                  </v-row>
                  <v-divider></v-divider>

                </v-col>
                <v-divider opacity=".8" thickness="3" gradient vertical></v-divider>
                <v-col cols="12" md="5" :class="smAndDown ? 'mt-5' : 'ml-4 mt-5'">
                  <!-- <p class="font-weight-bold mb-4"><v-icon start>mdi-credit-card-outline</v-icon> Salary Information</p>
                <v-divider class="my-4"></v-divider> -->
                  <v-row dense>
                    <v-col cols="12">
                      <v-radio-group v-model="mode" inline>
                        <template v-slot:label>
                          <div>Mode</div>
                        </template>
                        <v-radio label="ATM" value="atm"></v-radio>
                        <v-radio label="Cash" value="cash"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-autocomplete v-model="employee" :items="employees" item-title="employee_name"
                        :rules="[rules.general]" variant="solo-filled" flat item-value="documentId"
                        label="Select Employee" return-object required>
                      </v-autocomplete>
                      <!-- <v-autocomplete v-model="employee" :items="employees" item-title="employee_name"
                      variant="solo-filled" flat item-value="documentId" label="Select Employee" return-object>

                    </v-autocomplete> -->
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col cols="12" md="4">
                      <v-text-field label="No of Units" variant="solo-filled" flat type="number" v-model="noOfUnits" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field label="Cisco No of Units" variant="solo-filled" flat type="number"
                        v-model="ciscoNoOfUnits" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field label="RLE No of Units" variant="solo-filled" flat type="number"
                        v-model="rleNoOfUnits" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field label="Overtime" variant="solo-filled" flat type="number" v-model="overtime" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field label="Lates" variant="solo-filled" flat type="number" v-model="late" />
                    </v-col>
                  </v-row>
                  <p class="font-weight-bold my-3">Premiums</p>
                  <v-row dense>
                    <v-col cols="12" md="4">
                      <v-text-field label="SSS" variant="solo-filled" flat type="number" v-model="sss" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field label="Philhealth" variant="solo-filled" flat type="number" v-model="philhealth" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field label="Pag-Ibig" variant="solo-filled" flat type="number" v-model="pagibig" />
                    </v-col>
                  </v-row>
                  <p class="font-weight-bold my-3">Other Deductions</p>
                  <v-row dense>
                    <v-col cols="12" md="4">
                      <v-text-field label="W/Holding Tax" variant="solo-filled" flat type="number"
                        v-model="withHoldingTax" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field label="SSS Loan" variant="solo-filled" flat type="number" v-model="sssLoan" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field label="Pag-Ibig Loan" variant="solo-filled" flat type="number"
                        v-model="pagibigLoan" />
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="12" md="4">
                      <v-autocomplete v-model="cashAdvance" :items="cashAdvanceList" item-title="cash_advance_amount"
                        variant="solo-filled" flat item-value="documentId" label="Select Cash Advance" return-object
                        required>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4" v-show="showCashAdvanceDeduction">
                      <v-text-field label="Cash Advance Deduction" variant="solo-filled" flat type="number"
                        v-model="cashAdvanceDeduction" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field label="Health Card" variant="solo-filled" flat type="number" v-model="healthCard" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-pull-to-refresh>
  </div>
</template>

<script setup>
useHead({
  title: 'Payroll',

})
import qs from 'qs';
import { useDisplay } from 'vuetify'
const token = useCookie('token')
const { smAndDown } = useDisplay()
const baseUrl = useRuntimeConfig().public.strapiUrl
const route = useRoute();
const breadcrumbItems = [
  { text: 'Dashboard', to: '/', icon: 'mdi-home-outline' },
  { text: 'Payroll Management', to: '/payroll' },
  { text: 'Details' },
];
const header = [
  // { title: 'Payroll Period', key: 'name' },
  { title: 'Mode', key: 'mode', sortable: false },
  { title: 'ID No', key: 'employee.employee_no', sortable: false },
  { title: 'Employee Name', key: 'employee.employee_name', sortable: false },
  { title: 'Basic Pay', key: 'basic_pay', sortable: false },
  { title: 'Honorarium', key: 'honorarium', sortable: false },
  { title: 'Premium', key: 'premium', sortable: false },
  { title: 'Loads', key: 'units_total_amount', sortable: false },
  { title: 'Cisco', key: 'cisco_total_amount', sortable: false },
  { title: 'RLE', key: 'rle_total_amount', sortable: false },
  { title: 'Overtime', key: 'overtime', sortable: false },
  { title: 'Late', key: 'late_deduction', sortable: false },
  { title: 'Gross Pay', key: 'gross_pay', sortable: false },
  { title: 'SSS', key: 'sss', sortable: false },
  { title: 'Philhealth', key: 'philhealth', sortable: false },
  { title: 'Pag-Ibig', key: 'pagibig', sortable: false },
  { title: 'Net Gross Pay', key: 'net_gross_pay', sortable: false },
  { title: 'W/Holding Tax', key: 'withholding_tax', sortable: false },
  { title: 'SSS Loan', key: 'sss_loan', sortable: false },
  { title: 'Pag-Ibig Loan', key: 'pagibig_loan', sortable: false },
  { title: 'Cash Advance', key: 'cash_advance_deduction', sortable: false },
  { title: 'Health Card', key: 'health_card', sortable: false },
  { title: 'Net Pay', key: 'net_pay', sortable: false },

  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
];
const payrollDetailsTab = ref("atm")
const noRecordFound = ref(true)
const search = ref('')
const loading = ref(true)
const payrollEnlistmentForm = ref(null)
const formValid = ref(true)
const employees = ref([])
const payrollDetails = ref({})
const atmPayslips = ref([])
const cashPayslips = ref([])
const createEmployeePayrollDialog = ref(false)
const payroll_period = route.params.id
const mode = ref("atm")
const employee = ref(null)
const employeeName = ref('')
const position = ref("")
const department = ref("")
const basicPay = ref(0)
const honorarium = ref(0)
const premium = ref(0)
const amountPerUnit = ref(0)
const noOfUnits = ref(0);
const ciscoRate = ref(0)
const ciscoNoOfUnits = ref(0)
const rleRate = ref(0)
const rleNoOfUnits = ref(0)
//const unitsTotalAmount = ref(0)
const overtime = ref(0)
const late = ref(0)
//const grossPay = ref(0)
const sss = ref(0)
const philhealth = ref(0)
const pagibig = ref(0)
// const netGrossPay = ref(0)
const withHoldingTax = ref(0)
const sssLoan = ref(0)
const pagibigLoan = ref(0)
const showCashAdvanceDeduction = ref(false)
const cashAdvanceList = ref([])
const cashAdvance = ref(null)
const selectedCashAdvanceId = ref(null);
const cashAdvanceAmount = ref(0)
const cashAdvanceBalance = ref(0)
const originalCashAdvanceBalance = ref(0)
const cashAdvanceDeduction = ref(0)
const healthCard = ref(0)
//const netPay = ref(0)

const payslipId = ref(null)

const rules = {
  general: (v) => !!v || "This field is required"
}

const openEmployeeDialog = async () => {
  fetchEmployee();
  createEmployeePayrollDialog.value = true
}

const fetchPayroll = async (mode) => {
  // const res = await $fetch(`${baseUrl}/api/payroll-periods/${route.params.id}?populate[payslips][populate]=*`, {
  //   headers: {
  //     Authorization: `Bearer ${token.value}`
  //   },
  // })
  const query = qs.stringify({
    populate: {
      payslips: {
        // filters: {
        //   mode: {
        //     $eq: 'atm'
        //   }
        // },
        populate: '*'
      },
      user_info: {
        populate: '*'
      }
    }
  })
  const res = await $fetch(`${baseUrl}/api/payroll-periods/${route.params.id}?${query}`, {

    headers: {
      Authorization: `Bearer ${token.value}`
    },
  })
  loading.value = false
  payrollDetails.value = res.data;
  atmPayslips.value = res.data.payslips.filter(p => p.mode === 'atm')
  cashPayslips.value = res.data.payslips.filter(p => p.mode === 'cash')
  noRecordFound.value = false
  // console.log('Payroll Details ATM:', atmPayslips.value)
  //console.log('Payroll Details Cash:', cashPayslips.value)
}


const fetchEmployee = async () => {
  const res = await $fetch(`${baseUrl}/api/employees?populate=*`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    },
  });
  employees.value = res.data
}


// Open a new window for payroll printing
const openPrintPayrollWindow = (mode) => {
  console.log("Mode: ", mode)
  const url = `/payroll/${route.params.id}/report?mode=${mode}`
  const width = 1024
  const height = 800

  // Get current screen position (supports multi-monitor)
  const dualScreenLeft = window.screenLeft ?? window.screenX
  const dualScreenTop = window.screenTop ?? window.screenY

  const screenWidth = window.innerWidth ?? document.documentElement.clientWidth
  const screenHeight = window.innerHeight ?? document.documentElement.clientHeight

  // Calculate center position
  const left = (screenWidth - width) / 2 + dualScreenLeft
  const top = (screenHeight - height) / 2 + dualScreenTop

  window.open(url,
    'printWindow',
    `
  width=${width}
  height=${height}
  top-${top}
  left=${left}
  resizabe=yes
  scrollbars=yes`
  )
}


// Open a new window for payslip printing
const openPrintPayslipWindow = () => {
  const url = `/payroll/${route.params.id}/print`
  const width = 800
  const height = 800

  // Get current screen position (supports multi-monitor)
  const dualScreenLeft = window.screenLeft ?? window.screenX
  const dualScreenTop = window.screenTop ?? window.screenY

  const screenWidth = window.innerWidth ?? document.documentElement.clientWidth
  const screenHeight = window.innerHeight ?? document.documentElement.clientHeight

  // Calculate center position
  const left = (screenWidth - width) / 2 + dualScreenLeft
  const top = (screenHeight - height) / 2 + dualScreenTop

  window.open(url,
    'printWindow',
    `
  width=${width}
  height=${height}
  top-${top}
  left=${left}
  resizabe=yes
  scrollbars=yes`
  )
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

const closeCreateEmployeePayrollDialog = async () => {
  createEmployeePayrollDialog.value = false
  resetFormCreateEmployee()
}

const resetFormCreateEmployee = async () => {
  employee.value = ""
  mode.value = "atm"
  employeeName.value = ""
  position.value = ""
  department.value = ""
  basicPay.value = 0
  honorarium.value = 0
  premium.value = 0
  amountPerUnit.value = 0
  noOfUnits.value = 0
  unitsTotalAmount.value = 0
  overtime.value = 0
  late.value = 0
  sss.value = 0
  philhealth.value = 0;
  pagibig.value = 0
  withHoldingTax.value = 0
  sssLoan.value = 0
  pagibigLoan.value = 0
  healthCard.value = 0
  showCashAdvanceDeduction.value = false
  cashAdvanceList.value = []
  cashAdvance.value = null
  cashAdvanceAmount.value = 0
  cashAdvanceBalance.value = 0
  cashAdvanceDeduction.value = 0
  originalCashAdvanceBalance.value = 0
}


const submitForm = async () => {
  const isValid = await payrollEnlistmentForm.value?.validate();
  if (isValid.valid) {

    try {
      const payload = {
        data: {
          payroll_period: route.params.id,
          employee: employee.value?.id,
          mode: mode.value,
          basic_pay: basicPay.value,
          honorarium: honorarium.value,
          premium: premium.value,
          amount_per_unit: amountPerUnit.value,
          no_of_units: noOfUnits.value,
          units_total_amount: unitsTotalAmount.value,
          cisco_rate: ciscoRate.value,
          cisco_no_of_units: ciscoNoOfUnits.value,
          cisco_total_amount: ciscoTotalAmount.value,
          rle_rate: rleRate.value,
          rle_no_of_units: rleNoOfUnits.value,
          rle_total_amount: rleTotalAmount.value,
          overtime: overtime.value,
          late_deduction: late.value,
          gross_pay: grossPay.value,
          sss: sss.value,
          philhealth: philhealth.value,
          pagibig: pagibig.value,
          net_gross_pay: netGrossPay.value,
          withholding_tax: withHoldingTax.value,
          sss_loan: sssLoan.value,
          pagibig_loan: pagibigLoan.value,
          //cash_advance_amount: cashAdvanceAmount.value,
          //cash_advance_balance: cashAdvanceBalance.value,
          //cash_advance_deduction: cashAdvanceDeduction.value,
          health_card: healthCard.value,
          net_pay: netPay.value
        }
      }

      // const cashAdvanceNewBalance = Number(cashAdvanceAmount.value) - Number(cashAdvanceDeduction.value)
      //console.log("Submitted: ", payload)
      //console.log("Employee: ", employee.value)

      // STEP 1: Creating Payslip
      //console.log("Processing payslip..")
      const payslip = await $fetch(`${baseUrl}/api/payslips`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: payload,
      })

      payslipId.value = payslip.data.documentId

      //console.log("Cash Advance Selected: ", selectedCashAdvanceId.value)

      // STEP 2: Processing Cash Advance
      // console.log("Processing cash advance..", payslipId.value)
      //console.log("Selected Cash Advance: ", selectedCashAdvanceId.value)
      if (selectedCashAdvanceId.value !== null) {
        //console.log("Processing cash advance..", payslipId.value)
        await $fetch(`${baseUrl}/api/cash-advance-payments`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.value}`
          },
          body: {
            data: {
              cash_advance: selectedCashAdvanceId.value,
              cash_advance_payment: cashAdvanceDeduction.value,
              payslips: payslip.data.id,
              payment_date: new Date().toISOString().split('T')[0],
              payroll_period: route.params.id
            }
          }
        })
      }


      // await $fetch(`${baseUrl}/api/employees/${employee.value?.documentId}`, {
      //   method: 'PUT',
      //   body: {
      //     data: {
      //       cash_advance_balance: cashAdvanceNewBalance
      //     }
      //   }
      // })

      //console.log("Cash Advance New Balance: ", cashAdvanceBalance.value)
      //console.log("Employee:", employee.value?.documentId)
      //console.log('Cash Advance', cashAdvance)

      alert(`Payroll for ${employee.value?.employee_name} successfully created `)
      payrollEnlistmentForm.value?.reset()
      resetFormCreateEmployee()
      createEmployeePayrollDialog.value = false
      fetchPayroll();

    } catch (err) {
      const message = err?.response?._data?.error?.message || "Unknown error";
      console.log("Error message: ", message)
      // Rollback payslip if step 2 failed
      if (payslipId.value) {
        try {
          await $fetch(`${baseUrl}/api/payslips/${payslipId.value}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token.value}`
            },
          })
          console.warn('Payslip rolled back')
        } catch (rollbackError) {
          console.error('Rollback failed:', rollbackError)
        }
      }
      alert(message)
    }


  }

}

const onRefresh = async ({ done }) => {
  try {
    //1. Refresh all useFetch on the page
    await fetchPayroll()

    //2. Manual delay to let the animation finish smoothly
    await new Promise(resolve => setTimeout(resolve, 500))
  } finally {
    //3. Crucial: Call done() to hide the loading indicator
    done()
  }
}


function formatCurrency(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(value)
}

// const computeValues = () => {
//   grossPay.value = basicPay.value + honorarium.value + premium.value + unitsTotalAmount.value + overtime.value - late.value
// }

const unitsTotalAmount = computed(() => {
  return (Number(amountPerUnit.value) || 0) * (Number(noOfUnits.value) || 0)
})

const ciscoTotalAmount = computed(() => {
  return (Number(ciscoRate.value) || 0) * (Number(ciscoNoOfUnits.value) || 0)
})

const rleTotalAmount = computed(() => {
  return (Number(rleRate.value) || 0) * (Number(rleNoOfUnits.value) || 0)
})

const grossPay = computed(() => {
  return Number(basicPay.value) + Number(honorarium.value) + Number(premium.value) + Number(unitsTotalAmount.value) + Number(ciscoTotalAmount.value) + Number(rleTotalAmount.value) + Number(overtime.value) - Number(late.value)
})

const totalPremiums = computed(() => {
  return Number(sss.value) + Number(philhealth.value) + Number(pagibig.value)
})
const netGrossPay = computed(() => {
  return Number(grossPay.value) - Number(totalPremiums.value)
})

const otherDeductionsTotal = computed(() => {
  return Number(withHoldingTax.value) + Number(sssLoan.value) + Number(pagibigLoan.value) + Number(cashAdvanceDeduction.value) + Number(healthCard.value)
})

// const cashAdvanceNewBalance = computed(() => {
//   return Number(cashAdvanceBalance.value) - Number(cashAdvanceDeduction.value)
// })


const computeNewCashAdvanceBalance = (payslip) => {
  const current = Number(payslip.employee?.cashAdvanceBalance || 0)
  const deducted = Number(payslip.cash_advance || 0)

  return Math.max(current - deducted, 0)
}

const netPay = computed(() => {
  return Number(netGrossPay.value) - Number(otherDeductionsTotal.value)
})

const totalNetPay = computed(() => {
  if (!payrollDetails.value?.payslips) return 0

  // return payrollDetails.value.payslips.reduce((sum, row) => {
  //   sum + Number(row.net_pay || 0), 0
  // })
  return payrollDetails.value.payslips.reduce((sum, row) => sum + Number(row.net_pay), 0)
})

const totalATMNetPay = computed(() => {
  if (!atmPayslips.value) return 0
  return atmPayslips.value.reduce((sum, row) => sum + Number(row.net_pay), 0)
})

const totalCashNetPay = computed(() => {
  if (!cashPayslips.value) return 0
  return cashPayslips.value.reduce((sum, row) => sum + Number(row.net_pay), 0)
})

onMounted(async () => {
  await fetchPayroll();
  //await fetchPayslips();
})




watch(employee, () => {
  if (employee.value) {
    //console.log('Selected Employee: ', employee.value)
    employeeName.value = employee.value?.employee_name
    position.value = employee.value?.position
    department.value = employee.value?.department
    basicPay.value = employee.value?.basic_pay / 2;
    honorarium.value = employee.value?.honorarium / 2
    premium.value = employee.value?.premium / 2
    amountPerUnit.value = employee.value?.amount_per_unit
    ciscoRate.value = employee.value?.cisco_rate
    rleRate.value = employee.value?.rle_rate
    sss.value = employee.value?.sss
    philhealth.value = employee.value?.philhealth
    pagibig.value = employee.value?.pagibig
    sssLoan.value = employee.value?.sss_loan
    pagibigLoan.value = employee.value?.pagibig_loan
    cashAdvanceList.value = employee.value?.cash_advances
    //cashAdvanceAmount.value = employee.value?.cash_advance_amount
    //cashAdvanceBalance.value = employee.value?.cash_advance_balance

    if (payrollDetails.value?.cut_off_type === 'first_half') {
      //console.log("1st Half")
      sssLoan.value = 0,
        pagibigLoan.value = 0
    } else if (payrollDetails.value?.cut_off_type === 'second_half') {
      //console.log("2nd half")
      sss.value = 0
      philhealth.value = 0
      pagibig.value = 0
    }

  }




  // cashAdvanceBalance.value = originalCashAdvanceBalance.value
  // cashAdvanceDeduction.value = 0;
})

watch(cashAdvance, () => {
  //console.log('Selected Cash Advance: ', cashAdvance.value)

  if (cashAdvance.value === null) {
    showCashAdvanceDeduction.value = false
  } else {
    selectedCashAdvanceId.value = cashAdvance.value.documentId
    //console.log(`Selected Cash Advance ID: `, selectedCashAdvanceId.value)
    showCashAdvanceDeduction.value = true
    cashAdvanceAmount.value = cashAdvance.value?.cash_advance_amount || 0
    cashAdvanceBalance.value = cashAdvance.value?.cash_advance_balance || 0


    originalCashAdvanceBalance.value = Number(
      cashAdvance.value.cash_advance_balance || 0
    )
  }
})

watch(cashAdvanceDeduction, (deduction) => {
  cashAdvanceBalance.value = Math.max(
    originalCashAdvanceBalance.value - Number(deduction || 0), 0
  )
})
</script>

<style scoped>
:deep() .v-table .v-table__wrapper>table>thead>tr>th {
  /* border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-bottom: thick solid rgba(var(--v-border-color), var(--v-border-opacity)); */
  font-weight: bold;

}

/* :deep() .v-table .v-table__wrapper>table>tbody>tr>td:not(:last-child),
.v-table .v-table__wrapper>table>tbody>tr>th:not(:last-child) {
  border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
} */
/* :deep() .v-table .v-table__wrapper>table>tbody>tr:nth-child(even) {
  background-color: #f2f2f2;
} */

:deep() .v-table .v-table__wrapper>table>tbody>tr:hover {
  background-color: #f2f2f2;
}

.total-netpay {
  font-size: 2vh;
  text-transform: uppercase;
}
</style>