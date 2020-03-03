import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentData } from './paymentData'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  formPayment: FormGroup;
  type: number;
  installmentType: number;

  constructor() { }

  ngOnInit(): void {
    this.createForm(new PaymentData());
  }

  createForm(paymentData: PaymentData) {

    this.formPayment = new FormGroup({
      type: new FormControl(paymentData.type, [Validators.required]),
      installmentType: new FormControl(paymentData.installmentType, [Validators.required]),
      installment: new FormControl(paymentData.installment, [Validators.required]),
      amount: new FormControl(paymentData.amount),
      userReference: new FormControl("CODVENDA")
    })
  }

  onSubmit() {
    console.log(this.formPayment.value)
  }

  getType() {
    this.type = this.formPayment.controls.type.value;
    if (this.type == 2 || this.type == 3) {
      this.formPayment.controls.installmentType.setValue(1);
      this.formPayment.controls.installment.setValue(1);
    }
  }
  getInstallmentType() {
    this.formPayment.controls.installment.setValue(null);
    this.installmentType = this.formPayment.controls.installmentType.value;

    if (this.installmentType == 1) {
      this.formPayment.controls.installment.setValue(1);
    }
  }
}
