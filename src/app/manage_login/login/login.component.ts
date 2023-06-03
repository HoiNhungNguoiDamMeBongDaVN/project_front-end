import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { accountAdmin } from 'src/app/models/account_admin.model';
import { ApiAccountAdminService } from 'src/app/services/api_account/api-account-admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private manageLogin:ApiAccountAdminService, private router:Router) { }
  accountManage:accountAdmin=new accountAdmin();

  ngOnInit(): void {
    this.loadAccount();
  }

  loginManage(x:NgForm){
    if(x.valid){
      this.manageLogin.checkAccountAdmin(this.accountManage).then((res:any)=>{
        this.router.navigate(['admins'])
      }).catch(()=>{
        alert("Đăng nhập thất bại");
      })
    }
    else{
      alert("Vui lòng hoàn thanh form !")
    }
  }

  loadAccount(){
    this.manageLogin.getAllAccount().subscribe(data=>{
      this.manageLogin.listAccount=data;
    })
  }

}
