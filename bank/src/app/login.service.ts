import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _url = 'http://localhost:8080/customer/login/';
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private _http: HttpClient) { }

  register(userData, userName){
    return this._http.post<any>(this._url+userName, userData, this.httpOptions);
  }
}
