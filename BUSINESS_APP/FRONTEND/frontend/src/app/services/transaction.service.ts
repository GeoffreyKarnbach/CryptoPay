import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../dtos/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) {}

  getTransactionHistory(wallet_id: string): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(`http://192.168.0.239:5001/api/v1/transactions?wallet_id=${wallet_id}`);
  }
}
