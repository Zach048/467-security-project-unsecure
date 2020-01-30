import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public customer = {};
  public account = {};

  constructor(private _customerService: CustomerService, private _accountService: AccountService) { }

  ngOnInit() {
    this._customerService.getCustomer()
      .subscribe(data => this.customer = data);
    this._accountService.getAccount()
      .subscribe(data => this.account = data);
  }
}
