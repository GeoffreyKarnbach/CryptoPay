import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  getQrCode(amount: number, from_wallet_id: string): Observable<Blob> {

    return this.httpClient.get(`http://192.168.0.239:5001/api/v1/qr?amount=${amount}&wallet_id=${from_wallet_id}`, { responseType: 'blob' });
  }

  verifyPayment(from_wallet_id: string, to_wallet_id: string, amount: number): Observable<any> {

    const formdata = new FormData();
    formdata.append('from_wallet_id', from_wallet_id);
    formdata.append('to_wallet_id', to_wallet_id);
    formdata.append('amount', amount.toString());

    return this.httpClient.post('http://192.168.0.239:5001/api/v1/check_confirm_payment', formdata);
  }
}
