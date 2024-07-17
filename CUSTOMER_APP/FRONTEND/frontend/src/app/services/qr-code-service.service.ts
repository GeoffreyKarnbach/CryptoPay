import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeServiceService {

  constructor(private httpClient: HttpClient) { }

  getQrCode(wallet_id: string): Observable<Blob> {

    return this.httpClient.get(`http://192.168.0.239:5002/api/v1/qr?wallet_id=${wallet_id}`, {responseType: 'blob'});
  }
}
