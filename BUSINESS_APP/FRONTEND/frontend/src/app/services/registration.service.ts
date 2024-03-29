import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../dtos/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {}

  registerUser(user: User): Observable<any> {
    console.log(user);
    const formData = new FormData();
    formData.append('wallet_id', user.wallet_id);
    formData.append('customer_name', user.customer_name);
    formData.append('customer_address', user.customer_address);


    return this.httpClient.post<any>('http://192.168.0.239:5001/api/v1/register', formData);
  }
}
