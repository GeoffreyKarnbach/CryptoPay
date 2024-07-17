import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { QrCodeReaderComponent } from './components/shared/qr-code-reader/qr-code-reader.component';
import { StartPageComponent } from './components/start-page/start-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentPageComponent,
    QrCodeReaderComponent,
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
