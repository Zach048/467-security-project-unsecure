import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITransactions } from './transactions';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

    private _url: string = environment.API_URL+"transactions/account/";
    customerId: any;

    constructor(private http: HttpClient, private login: LoginService) { 
      this.login.currentId.subscribe(customerId => this.customerId = customerId)
    }
  
    getTransactions(): Observable<ITransactions[]>{
      return this.http.get<ITransactions[]>(this._url+this.customerId);
    }
}
