import { Component } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent {

  ngOnInit(): void {
    if (localStorage.getItem('wallet_id')) {
      this.isLoggedId = true;
      this.wallet_id = localStorage.getItem('wallet_id') || '';
    }
  }

  isLoggedId: boolean = false;

  wallet_id: string = '0000002';

  login(): void {
    localStorage.setItem('wallet_id', this.wallet_id);
    this.isLoggedId = true;
  }

  logout(): void {
    localStorage.removeItem('wallet_id');
    this.isLoggedId = false;
  }
}
