import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { accountAdmin } from 'src/app/models/account_admin.model';
import { ApiAccountAdminService } from 'src/app/services/api_account/api-account-admin.service';
import { LoginLogoutService } from 'src/app/services/api_login_logout-admin/login-logout.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private manageLogin: ApiAccountAdminService, private loginLogoutService: LoginLogoutService, private router: Router) { }
  accountManage: accountAdmin = new accountAdmin();

  ngOnInit(): void {
    // this.loadAccount();
  }

  loginManage(x: any) {
    if (x.valid) {
      console.log(x.value);


      this.loginLogoutService.getTokenManager(x.value).subscribe((res: any) => {
        if (res && res.errCode === 0) {
          console.log(res.data);
          
          this.manageLogin.checkAccountAdmin(res.data).then((res: any) => {
            this.router.navigate(['admins']);
          }).catch(() => {
            alert("Đăng nhập thất bại");
          })

        }
      })
    }
    else {
      alert("Vui lòng hoàn thanh form !")
    }
  }

  // loadAccount() {
  //   this.manageLogin.getAllAccount().subscribe(data => {
  //     this.manageLogin.listAccount = data;
  //   })
  // }

}
