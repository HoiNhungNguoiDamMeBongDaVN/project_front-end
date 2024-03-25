import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FunctionAlert } from 'src/app/function_alert/function_alert';
import { Customer } from 'src/app/models/customer.model';
import { ApiCustomerService } from 'src/app/services/api_customer/api-customer.service';
import { LoginLogoutService } from 'src/app/services/api_login_logout-admin/login-logout.service';
@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.scss']
})
export class LoginCustomerComponent {
  constructor(private checkAccountCustomer: ApiCustomerService, private loginLogoutService: LoginLogoutService, private router: Router, private formBuilde: FormBuilder, private functionAlert: FunctionAlert) { }
  registerCustomer: FormGroup | any;

  ngOnInit() {
    this.registerCustomer = this.formBuilde.group({
      name_account: ['', Validators.compose([])],
      password: ['', Validators.compose([])],

    })
  }

  loginCustomer(form: any) {
    if (form.valid) {
      this.loginLogoutService.getTokenCustomer(form.value).subscribe((res: any) => {
        if (res && res.errCode === 0) {
          this.checkAccountCustomer.checkAccountCustomer(res.data).then((res: any) => {
            this.router.navigate(['/indexs']);
          })
        }
        else {
          this.functionAlert.showAlertAndNavigate("Đăng nhập thất bại", '');
        }
      })
    }
    else {
      this.functionAlert.showAlertAndNavigate("Vui lòng hoàn thanh form !", '');
    }
  }


}



