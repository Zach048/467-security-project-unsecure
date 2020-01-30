import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  login = false;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private _loginService: LoginService, private router: Router) { }

  public customerId = {};

  ngOnInit() {}

  onSubmit(){
    this.submitted = true;
    console.log(this.loginForm.value);
    this._loginService.register(this.loginForm.value)
      .subscribe(
        response => console.log('Received username and password', response),
        error => console.error('Error receiving username and password', error)
      )
    this.router.navigate(['/dashboard']);
    /*
    if(this.loginForm.value.username == "admin" && this.loginForm.value.password == "admin"){
      this.router.navigate(['/dashboard']);
    }
    else{
      alert("Invalid username, password, or combination!")
    }
    */
  }

}
