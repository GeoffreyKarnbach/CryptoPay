import { Component, ElementRef, ViewChild } from '@angular/core';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent {

  constructor() { }

  qrCodeData: string = '';

  qrCodeDestinationWallet: string = '';
  qrCodeAmount: string = '';
  targetTransferURL: string = '';

  foundQrCode(value: string) {
    this.qrCodeData = value;
    this.qrCodeDestinationWallet = this.qrCodeData.split('_')[0];
    this.qrCodeAmount = this.qrCodeData.split('_')[1];
    this.targetTransferURL = "http://192.168.0.239:4200/transaction?target=" + this.qrCodeDestinationWallet + "&amount=" + this.qrCodeAmount;
  }

  resetQrCode() {
    this.qrCodeData = '';
    this.qrCodeDestinationWallet = '';
    this.qrCodeAmount = '';
    this.targetTransferURL = '';
  }
}
