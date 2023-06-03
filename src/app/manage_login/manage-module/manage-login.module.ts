import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegisterAccountComponent } from '../register-account/register-account.component';
import { ManageLoginRoutingModule } from '../manage.login.routing';
import { IndexComponent } from '../index/index.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterAccountComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    ManageLoginRoutingModule,
    FormsModule
  ]
})
export class ManageLoginModule { }
