import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

// Add new route with /payment?target=XXXXXX&amount=XXXXXX


const routes: Routes = [
  { path: 'transaction', component: NewTransactionComponent },
  { path: '**', redirectTo: '', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
