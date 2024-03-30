import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import jsQR from 'jsqr';

@Component({
  selector: 'app-qr-code-reader',
  templateUrl: './qr-code-reader.component.html',
  styleUrls: ['./qr-code-reader.component.scss']
})
export class QrCodeReaderComponent {
  ngOnInit() {
    this.videoRef = document.getElementById('qr_scanner');
    this.setupCamera();
  }

  constructor() { }

  @ViewChild('canvas', {static: true}) canvasElm!: ElementRef;
  @Output() qrCodeDataEvent = new EventEmitter<string>();
  @Output() qrCodeDataResetEvent = new EventEmitter<void>();

  videoRef: any;
  qrCodeData: string = '';

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
        this.qrCodeDataEvent.emit(this.qrCodeData);
      } else {
        this.qrCodeData = '';
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
    this.qrCodeDataResetEvent.emit();
    this.checkImage();
  }
}
