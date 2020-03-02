import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentData } from './paymentData'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  formPayment: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.createForm(new PaymentData());
  }

  createForm(paymentData: PaymentData) {

    this.formPayment = new FormGroup({
      type: new FormControl(paymentData.type, [Validators.required]),
      installmentType: new FormControl(paymentData.installmentType, [Validators.required]),
      amount: new FormControl(paymentData.amount),
      userReference: new FormControl("CODVENDA")
    })
  }

  onSubmit() {
    console.log(this.formPayment.value)
  }

}
