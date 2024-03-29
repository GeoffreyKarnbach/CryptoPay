import { Component } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
    if (localStorage.getItem('wallet_id')) {
      this.isLoggedId = true;
      this.wallet_id = localStorage.getItem('wallet_id') || '';
    }
  }

  isLoggedId: boolean = false;

  wallet_id: string = '0000002';
  customer_name: string = '';
  customer_address: string = '';

  registerUser(): void {
    // Confirm registration, send data to backend
    this.registrationService.registerUser({
      wallet_id: this.wallet_id,
      customer_name: this.customer_name,
      customer_address: this.customer_address
    }).subscribe((data: any) => {
      this.isLoggedId = true;
      localStorage.setItem('wallet_id', this.wallet_id);
    });
  }

  logout(): void {
    localStorage.removeItem('wallet_id');
    this.isLoggedId = false;
  }

}
