import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  _url = 'http://localhost:3000/payment';

  constructor(private _http: HttpClient) { }

  register(userData){
    return this._http.post<any>(this._url, userData);
  }
}
