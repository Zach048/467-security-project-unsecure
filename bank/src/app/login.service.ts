import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _url = 'http://localhost:8080/customer/login/';
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  private customerId = new BehaviorSubject<number>(null);
  currentId = this.customerId.asObservable();
  
  constructor(private _http: HttpClient) { }

  getCustomerId(id: number) {
    this.customerId.next(id)
  }

  register(userData, userName){
    return this._http.post<any>(this._url+userName, userData, this.httpOptions);
  }
}
