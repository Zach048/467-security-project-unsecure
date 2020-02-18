import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _url = environment.API_URL+'customer/login/';
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  private customerId = new BehaviorSubject<String>(localStorage.getItem('customerId'));
  currentId = this.customerId.asObservable();
  
  constructor(private _http: HttpClient) { }

  getCustomerId(id: String) {
    this.customerId.next(id)
  }

  register(userData, userName){
    return this._http.post<any>(this._url+userName, userData, this.httpOptions);
  }
}
