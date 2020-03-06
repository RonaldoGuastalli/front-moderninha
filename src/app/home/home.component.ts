import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentData } from './paymentData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  formPayment: FormGroup;
  type: number;
  installmentType: number;
  socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:6060');
  }

  ngOnInit(): void {
    this.createForm(new PaymentData());
    this.connectWs();
  }

  connectWs() {
    this.socket.onopen = () => {
      alert('[open] Connection established');
      alert('Sending to server');
    };
    this.socket.onmessage = (event) => {
      alert(`[message] Data received from server: ${event.data}`);
    };
    this.socket.onclose = event => {
      if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert('[close] Connection died');
      }
    };
    this.socket.onerror = error => {
      alert(`[error] ${error}`);
    };
  }

  createForm(paymentData: PaymentData) {

    this.formPayment = new FormGroup({

      mType: new FormControl(paymentData.mType, [Validators.required]),
      mInstallmentType: new FormControl(paymentData.mInstallmentType, [Validators.required]),
      mInstallment: new FormControl(paymentData.mInstallment, [Validators.required]),
      mAmount: new FormControl(paymentData.mAmount),
      mUserReference: new FormControl('CODVENDA')

    });
  }

  onSubmit() {

    if (this.checkAmount()) {
      alert('Valor incorreto!');
    } else {

      this.setAmount();
      if (this.installmentType != 1) {
        this.setInstallment();
      }

      //Implementar: Enviar o Objeto via: WS && HTTP

      this.socket.send(JSON.stringify(this.formPayment.value));
      console.log(this.formPayment.value);
    }
  }

  getType() {
    this.type = this.formPayment.controls.mType.value;
    this.formPayment.controls.mInstallmentType.setValue(null);

    if (this.type == 2 || this.type == 3) {
      this.setType();
      this.setInstallmentTypeValue1();
      this.setInstallmentValue1();
    }
  }

  getInstallmentType() {
    this.formPayment.controls.mInstallment.setValue(null);
    this.installmentType = this.formPayment.controls.mInstallmentType.value;

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
    this.formPayment.controls.mInstallmentType.setValue(parseInt(this.formPayment.controls.mInstallmentType.value));
  }

  private setType() {
    this.formPayment.controls.mType.setValue(parseInt(this.formPayment.controls.mType.value));
  }

  private setInstallment() {
    this.formPayment.controls.mInstallment.setValue(parseInt(this.formPayment.controls.mInstallment.value));
  }

  private setInstallmentTypeValue1() {
    this.formPayment.controls.mInstallmentType.setValue(1);
  }

  private setInstallmentValue1() {
    this.formPayment.controls.mInstallment.setValue(1);
  }
  private setAmount() {
    this.formPayment.controls.mAmount.setValue(parseInt(this.formPayment.controls.mAmount.value));
  }

  private checkAmount() {
    return this.formPayment.controls.mAmount.value == 0;
  }
}
