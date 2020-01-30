import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CreditcardComponent } from './creditcard/creditcard.component';
import { PersonalComponent } from './personal/personal.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'transactions', component: TransactionsComponent},
  {path:'credit', component: CreditcardComponent},
  {path:'personal', component: PersonalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,
                                  DashboardComponent,
                                  TransactionsComponent, 
                                  CreditcardComponent, 
                                  PersonalComponent
                                ]
