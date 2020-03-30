import { Body } from './body';

export class PaymentData {
  userId: number;
  messageType: string;
  body: Body = new Body();
    // mType: number;
    // mInstallmentType: number;
    // mInstallment: number;
    // mAmount: number;
    // mUserReference: string;
}
