import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) { }

  startTransaction(originWallet: string, targetWallet: string, amount: number): Observable<any> {

    const formData = new FormData();
    formData.append('from_wallet_id', originWallet);
    formData.append('to_wallet_id', targetWallet);
    formData.append('amount', amount.toString());

    return this.httpClient.post('http://192.168.0.239:5000/api/v1/transaction', formData);
  }
}
