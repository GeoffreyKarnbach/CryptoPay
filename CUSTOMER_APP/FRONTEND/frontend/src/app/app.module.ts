import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { QrCodeReaderComponent } from './components/shared/qr-code-reader/qr-code-reader.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentPageComponent,
    QrCodeReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
