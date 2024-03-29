import { Component, ElementRef, ViewChild } from '@angular/core';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent {

  constructor() { }

  @ViewChild('canvas', {static: true}) canvasElm!: ElementRef;

  videoRef: any;
  stringContent: string = '';
  qrCodeData: string = '';

  qrCodeDestinationWallet: string = '';
  qrCodeAmount: string = '';
  targetTransferURL: string = '';

  ngOnInit() {
    this.videoRef = document.getElementById('qr_scanner');
    this.setupCamera();
  }

  setupCamera() {
    navigator.mediaDevices.getUserMedia(
      {
        video: {width: 500, height: 500, facingMode: 'environment'},
        audio: false
      }
      )
      .then((stream) => {
        this.videoRef.srcObject = stream;
        this.checkImage();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkImage() {
    // Consolee log snapshot of the video
    const canvas = this.canvasElm.nativeElement;
    const context = canvas.getContext('2d');
    const video = this.videoRef;

    // Ensure canvas dimensions match video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the entire video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    var imageData;
    // Get the entire image data from the canvas
    try {
      imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        this.qrCodeData = code.data;
        this.qrCodeDestinationWallet = code.data.split('_')[0];
        this.qrCodeAmount = code.data.split('_')[1];
        this.targetTransferURL = "http://192.168.0.239:4200/transaction?target=" + this.qrCodeDestinationWallet + "&amount=" + this.qrCodeAmount;
      } else {
        console.log('No QR code found');
        setTimeout(() => {
          this.checkImage();
        }, 100);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        this.checkImage();
      }, 100);
    }
  }

  resetScan(){
    this.qrCodeData = '';
    this.qrCodeDestinationWallet = '';
    this.qrCodeAmount = '';
    this.checkImage();
  }

}
