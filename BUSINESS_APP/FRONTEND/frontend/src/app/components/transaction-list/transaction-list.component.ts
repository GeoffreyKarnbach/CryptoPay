import { Component } from '@angular/core';
import { Transaction } from 'src/app/dtos/transaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {

  constructor(private transactionService: TransactionService) { }

  pastTransactions: Transaction[] = [];
  wallet_id: string = '';
  loggedIn: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('wallet_id')) {
      this.wallet_id = localStorage.getItem('wallet_id') || '';
      this.loggedIn = true;
      this.transactionService.getTransactionHistory(this.wallet_id).subscribe((response) => {
        this.pastTransactions = response;
      });
    }
  }
}
