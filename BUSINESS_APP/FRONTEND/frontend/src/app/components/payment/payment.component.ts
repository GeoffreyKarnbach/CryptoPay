import { Component } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    if (localStorage.getItem('wallet_id')) {
      this.wallet_id = localStorage.getItem('wallet_id') || '';
      this.loggedIn = true;
    }

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // true for mobile device
      this.isMobileDevice = true;
    }else{
      // false for not mobile device
      this.isMobileDevice = false;
    }
  }

  loggedIn: boolean = false;
  amount: number = 0;
  qrCode: any;
  wallet_id: string = '0000002';

  showQRCode: boolean = false;
  customer_wallet_id: string = '';
  confirmed_payment: boolean = false;
  confirmed_payment_rejected: boolean = false;

  activeClientQRCodeScanning: boolean = false;
  isMobileDevice: boolean = false;
  activeTransactionVerification: boolean = false;
  limitTransactionVerificationAttempts: number = 3;

  getQrCode(): any {

    this.paymentService.getQrCode(this.amount, this.wallet_id).subscribe((response) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.qrCode = event.target.result;
        this.showQRCode = true;
      };
      reader.readAsDataURL(response);
    });
  }

  verifyTransaction(): any {
    this.confirmed_payment = false;
    this.confirmed_payment_rejected = false;
    this.paymentService.verifyPayment(this.customer_wallet_id, this.wallet_id, this.amount).subscribe(
      (data) => {
        this.confirmed_payment = true;
        this.activeTransactionVerification = false;
      },
      (error) => {
        if (this.limitTransactionVerificationAttempts > 0) {
          this.limitTransactionVerificationAttempts--;
          setTimeout(() => {
            this.verifyTransaction();
          }, 1000);
        } else {
          this.confirmed_payment_rejected = true;
          this.activeTransactionVerification = false;
        }
      }
    );
  }

  startTransactionVerification(): any {
    this.limitTransactionVerificationAttempts = 10;
    this.activeTransactionVerification = true;
    this.verifyTransaction();
  }

  startScanningClientQrCode(): any {
    this.activeClientQRCodeScanning = true;
  }

  newQrCodeEvent(event: any): any {
    this.customer_wallet_id = event;
    this.activeClientQRCodeScanning = false;
  }

  resetQrCodeEvent(): any {
    this.customer_wallet_id = '';
    this.activeClientQRCodeScanning = false;
  }
}
