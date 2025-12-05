<template>
<v-dialog v-model="createEmployeePayrollDialog" width="1000">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Payroll Enlistment</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="payrollEnlistmentForm" v-model="formValid">

            <v-row dense class="myh-4">
              <v-col cols="12" md="6">
                <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                  <v-row dense>
                    <v-col cols="7" class="font-weight-bold"> Payroll Cover Start:</v-col>
                    <v-col cols="5"> {{ formatDate(payrollDetails.payroll_period_start)
                    }}</v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card class="bg-grey-lighten-4 pa-3 h-230" elevation="0" rounded="lg">
                  <v-row dense>
                    <v-col cols="7" class="font-weight-bold"> Payroll Cover End:</v-col>
                    <v-col cols="5"> {{ formatDate(payrollDetails.payroll_period_end)
                    }}</v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>

            <!-- <v-row dense>
              <v-col cols="12">
                <v-text-field label="Payroll Period ID" v-model="payroll_period" />
              </v-col>
            </v-row> -->

            <v-divider class="my-4"></v-divider>
            <p class="font-weight-bold mb-4"><v-icon start>mdi-account</v-icon> Employee Information</p>
            <v-row dense>
              <v-col cols="4">
                <!-- <v-text-field label="Employee ID" v-model="form.employee" /> -->
                <!-- <v-select v-model="form.employee" :items="employees" item-title="employee_name" item-value="documentId" label="Employee ID" return-object></v-select> -->
                <v-autocomplete v-model="employee" :items="employees" item-title="employee_name" variant="solo-filled"
                  flat item-value="documentId" label="Select Employee" return-object>

                </v-autocomplete>

              </v-col>
              <v-col cols="4">
                <v-text-field label="Position" variant="solo-filled" readonly flat v-model="position" />
              </v-col>
               <v-col cols="4">
                <v-text-field label="Department" variant="solo-filled" readonly flat v-model="department" />
              </v-col>
            </v-row>

            <v-divider class="my-2" />
            <p class="font-weight-bold mb-4"><v-icon start>mdi-credit-card-outline</v-icon> Salary Information</p>
            <v-row dense>
              <v-col cols="3">
                <v-text-field label="Basic Pay" variant="solo-filled" prefix="₱" flat type="number" v-model="basicPay" />
              </v-col>
              <v-col cols="3">
                <v-text-field label="Honorarium" variant="solo-filled" prefix="₱" flat type="number" v-model="honorarium" />
              </v-col>
              <v-col cols="3">
                <v-text-field label="Premium" variant="solo-filled" prefix="₱" flat type="number" v-model="premium" />
              </v-col>

              <v-col cols="3">
                <v-text-field label="Amount Per Unit" variant="solo-filled" readonly prefix="₱" flat type="number"
                  v-model="amountPerUnit" />
              </v-col>
              <v-col cols="3">
                <v-text-field label="No of Units" variant="solo-filled" flat type="number" v-model="noOfUnits" />
              </v-col>
              <v-col cols="3">
                <v-text-field label="Units Total Amount" variant="solo-filled" readonly prefix="₱" flat type="number"
                  v-model="unitsTotalAmount" />
              </v-col>
              <v-col cols="3">
                <v-text-field label="Overtime" variant="solo-filled" prefix="₱" flat type="number" v-model.number="overtime" />
              </v-col>
              <v-col cols="3">
                <v-text-field label="Late" variant="solo-filled" prefix="₱" flat type="number" v-model="late" />
              </v-col>

              <v-col cols="12">
                <v-text-field label="Gross Pay" variant="solo-filled" prefix="₱" flat v-model="grossPay" readonly />
              </v-col>
            </v-row>

            <v-divider class="my-2" />
            <v-list-subheader class="font-weight-bold mt-2">Premiums</v-list-subheader>
            <v-row dense>
              <v-col cols="3">
                <v-text-field type="number" variant="solo-filled" flat label="SSS" v-model="sss" />
              </v-col>
              <v-col cols="3">
                <v-text-field type="number" variant="solo-filled" flat label="Philhealth" v-model="philhealth" />
              </v-col>
              <v-col cols="3">
                <v-text-field type="number" variant="solo-filled" flat label="Pag-Ibig" v-model="pagibig" />
              </v-col>
              <v-col>
                <v-text-field type="number" variant="solo-filled" flat label="Total Premiums"
                  v-model="totalPremiums"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="Net Gross Pay" variant="solo-filled" flat v-model="netGrossPay" readonly />
              </v-col>
            </v-row>
            <v-divider class="my-2" />
            <v-list-subheader class="font-weight-bold mt-2">Other Deductions</v-list-subheader>
            <v-row dense>
              <v-col cols="3">
                <v-text-field type="number" variant="solo-filled" flat label="W/Hoding Tax"
                  v-model="withHoldingTax"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field type="number" variant="solo-filled" flat label="SSS Loan"
                  v-model="sssLoan"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field type="number" variant="solo-filled" flat label="Pag-Ibig Loan"
                  v-model="pagibigLoan"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field type="number" variant="solo-filled" flat label="Cash Advance Amount"
                  v-model="cashAdvanceAmount"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field type="number" variant="solo-filled" flat label="Cash Advance Balance"
                  v-model="cashAdvanceBalance"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field type="number" variant="solo-filled" flat label="Cash Advance Deduction"
                  v-model="cashAdvanceDeduction"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field type="number" variant="solo-filled" flat label="Health Card"
                  v-model="healthCard"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field type="number" variant="solo-filled" flat label="Other Deductions Total" readonly
                  v-model="otherDeductionsTotal"></v-text-field>
              </v-col>
            </v-row>
            <v-divider class="my-2"></v-divider>
            <v-list-subheader class="font-weight-bold mt-2">Total Net Pay</v-list-subheader>
            <v-row dense>


              <v-col cols="12">
                <v-text-field label="Net Pay" variant="solo-filled" flat v-model="netPay" readonly />
              </v-col>


            </v-row>

            <v-row>
              <v-col cols="12">
                <v-btn color="primary" @click="submitForm">Save Payslip</v-btn>
              </v-col>
            </v-row>

          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    </template>