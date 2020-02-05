import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAccount } from './account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    // private _url: string = "/assets/data/account.json"
    private _url: string = "http://localhost:8080/account/id/1"

    constructor(private http: HttpClient) { }
  
    getAccount(): Observable<IAccount>{
      return this.http.get<IAccount>(this._url);
    }
}
