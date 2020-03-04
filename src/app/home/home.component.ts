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

    if (this.checkAmount()) {
      alert('Valor incorreto!');
    } else {

      this.setAmount();
      if (this.installmentType != 1)
        this.setInstallment();

      //Implementar: Enviar o Objeto via: WS && HTTP
      console.log(this.formPayment.value)
    }
  }

  getType() {
    this.type = this.formPayment.controls.type.value;
    this.formPayment.controls.installmentType.setValue(null);

    if (this.type == 2 || this.type == 3) {
      this.setType();
      this.setInstallmentTypeValue1();
      this.setInstallmentValue1();
    }
  }

  getInstallmentType() {
    this.formPayment.controls.installment.setValue(null);
    this.installmentType = this.formPayment.controls.installmentType.value;

    if (this.installmentType == 1) {
      this.setType();
      this.setInstallmentType();
      this.setInstallmentValue1();
    } else {
      this.setType();
      this.setInstallmentType();
    }
  }

  private setInstallmentType() {
    this.formPayment.controls.installmentType.setValue(parseInt(this.formPayment.controls.installmentType.value));
  }

  private setType() {
    this.formPayment.controls.type.setValue(parseInt(this.formPayment.controls.type.value));
  }

  private setInstallment() {
    this.formPayment.controls.installment.setValue(parseInt(this.formPayment.controls.installment.value));
  }

  private setInstallmentTypeValue1() {
    this.formPayment.controls.installmentType.setValue(1);
  }

  private setInstallmentValue1() {
    this.formPayment.controls.installment.setValue(1);
  }
  private setAmount() {
    this.formPayment.controls.amount.setValue(parseInt(this.formPayment.controls.amount.value));
  }

  private checkAmount() {
    return this.formPayment.controls.amount.value == 0;
  }
}
