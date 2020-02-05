import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITransactions } from './transactions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

    // private _url: string = "/assets/data/transactions.json"
    private _url: string = "http://localhost:8080/transactions/account/1"

    constructor(private http: HttpClient) { }
  
    getTransactions(): Observable<ITransactions[]>{
      return this.http.get<ITransactions[]>(this._url);
    }
}
