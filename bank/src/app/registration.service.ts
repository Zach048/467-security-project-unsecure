import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  _url = environment.API_URL+'customer/update';
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private _http: HttpClient) { }

  register(userData){
    return this._http.put<any>(this._url, userData, this.httpOptions);
  }
}
