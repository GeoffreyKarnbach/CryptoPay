import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  walletId: string = '';
  loggedIn: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.walletId = localStorage.getItem('walletId') || '';
    if (this.walletId) {
      this.loggedIn = true;
    }
  }

  confirmLogin() {

    this.loginService.login(this.walletId).subscribe(
      data => {
        this.loggedIn = true;
        localStorage.setItem('walletId', this.walletId);
      },
      error => {
        alert('Wallet not found');
      }
    );
  }

  logout() {
    this.walletId = '';
    localStorage.removeItem('walletId');
    this.loggedIn = false;
  }

}
