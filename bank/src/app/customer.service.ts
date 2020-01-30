import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomer } from './customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  //private _url: string = "/assets/data/customer.json"
  private _url: string = "http://localhost:8080/customer/id/1"

  constructor(private http: HttpClient) { }

  getCustomer(): Observable<ICustomer>{
    return this.http.get<ICustomer>(this._url);
  }
}
