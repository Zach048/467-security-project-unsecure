import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { PaymentService } from '../payment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditcardComponent implements OnInit {
  public account: any = {};
  _url = environment.API_URL+'account/payCreditCard/';
  editable = true;

  creditForm = new FormGroup({
    checkingAccount: new FormControl(''),
    checkingBalance: new FormControl(''),
    creditCard: new FormControl(''),
    creditCardBalance: new FormControl(''),
    creditCardPayment: new FormControl('', Validators.min(0))
  });

  constructor(private _accountService: AccountService, private _paymentService: PaymentService, private router: Router) { }

  ngOnInit() {
    this._accountService.getAccount()
      .subscribe(data => this.account = data);
  }

  validatePayment(num: number){
    if(num == null){
      alert("Invalid Payment Type!");
      return false;
    }
    else if(num <= 0){
      alert("Payment Must Be Greater than Zero!");
      return false;
    }
    else if(num > this.creditForm.value.accountBalance){
      alert("Payment Cannot Exceed Checking Account Balance of $" + this.creditForm.value.accountBalance);
      return false;
    }
    else if(num > this.creditForm.value.creditCardBalance){
      alert("Payment Cannot Exceed Credit Card Balance of $" + this.creditForm.value.creditCardBalance);
      return false;
    }
    else if(!Number.isInteger(num)){
      if(num.toString().split(".")[1].length > 2){
        alert("Payment Cannot Exceed Two Decimal Places!");
        return false;
      }
      return true;
    }
    else{
      return true;
    }
  }

  onSubmit(){
    if(this.validatePayment(this.creditForm.value.creditCardPayment)){
      console.log(this.creditForm.value);
      this._paymentService.register(this._url+this.creditForm.value.creditCardPayment, this.account)
        .subscribe(
          response => console.log('Successfully submitted credit card payment', response),
          error => console.error('Error processing credit card payment', error)
        )
      this.router.navigate(['/dashboard']);
    }
  }
  
}
