import { Component } from '@angular/core';
import { QrCodeServiceService } from 'src/app/services/qr-code-service.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent {

  constructor(private qrCodeService: QrCodeServiceService) { }

  qrCodeData: string = '';

  qrCodeDestinationWallet: string = '';
  qrCodeAmount: string = '';
  targetTransferURL: string = '';

  loggedIn: boolean = false;
  wallet_id: string = '';
  qrCodeImageForWalletId: string = '';
  showQrCode: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('wallet_id')) {
      this.wallet_id = localStorage.getItem('wallet_id') || '';
      this.loggedIn = true;
    }

    /*
    this.qrCodeService.getQrCode(this.wallet_id).subscribe((response) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.qrCodeImageForWalletId = event.target.result;
      };
      reader.readAsDataURL(response);
    });
    */
    this.qrCodeImageForWalletId = "assets/0000001.png";
  }

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

  switchShowQrCodeForWalletId() {
    this.showQrCode = !this.showQrCode;
  }
}
