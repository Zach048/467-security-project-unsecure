import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _http: HttpClient) { }

  register(url, userData){
    return this._http.post<any>(url, userData);
  }
}
