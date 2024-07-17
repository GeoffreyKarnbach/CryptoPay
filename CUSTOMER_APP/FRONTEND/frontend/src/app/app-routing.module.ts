import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { StartPageComponent } from './components/start-page/start-page.component';

const routes: Routes = [
  { path: 'payment', component: PaymentPageComponent },
  { path: '**', component: StartPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
