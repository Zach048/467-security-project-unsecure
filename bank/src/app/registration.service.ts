import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  _url = 'http://localhost:8080/customer/update';
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private _http: HttpClient) { }

  register(userData){
    return this._http.put<any>(this._url, userData, this.httpOptions);
  }
}
