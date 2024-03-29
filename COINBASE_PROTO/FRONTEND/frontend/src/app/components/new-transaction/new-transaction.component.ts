import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent {

  constructor(private route: ActivatedRoute, private router: Router, private transactionService: TransactionService) { }

  originWallet: string = '';
  targetWallet: string = '';
  amount: number = 0;

  pendingTransaction: boolean = false;

  ngOnInit() {

    this.originWallet = localStorage.getItem('walletId') || '';
    if (!this.originWallet) {
      this.router.navigate(['/']);
      return;
    }

    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0 && (!params['target'] || !params['amount'] || isNaN(params['amount'])) && Object.keys(params).length != 2) {
        console.error('Invalid parameters');
        this.router.navigate(['/']);
        return;
      }

      if (Object.keys(params).length != 0 && Object.keys(params).length != 2) {
        console.error('Invalid parameters');
        this.router.navigate(['/']);
        return;
      }

      if (Object.keys(params).length != 0) {
        this.targetWallet = params['target'];
        this.amount = params['amount'];
      }
    });
  }

  confirmTransaction() {
    this.pendingTransaction = true;
    console.log('Transaction started');

    setTimeout(() => {
      this.startTransaction();
    }, 5000);
  }

  startTransaction() {
    this.transactionService.startTransaction(this.originWallet, this.targetWallet, this.amount).subscribe(
      (response) => {
        this.pendingTransaction = false;
        alert('Transaction completed');
        this.router.navigate(['/']);
      },
      (error) => {
        this.pendingTransaction = false;
        alert(error.error.error);
        console.error(error);
      }
    );
  }
}
