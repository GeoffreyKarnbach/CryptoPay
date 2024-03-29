import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = 'http://192.168.0.239:5000/api/v1/wallet';

  constructor(private http: HttpClient) { }

  login(walletId: string): Observable<any> {
    return this.http.get(this.baseUrl + '?wallet_id=' + walletId);
  }
}
