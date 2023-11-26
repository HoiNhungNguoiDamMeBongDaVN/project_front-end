import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { VALIDATE_FORM_REGISTER } from 'src/app/utils/messagesCustomer';
import { ApiCustomerService } from 'src/app/services/api_customer/api-customer.service';
import { ToastSuccess, ToastWarning, MESS_CREATE_CONFIRM, ToastError } from 'src/app/utils/alert';
import { CREATE_CUSTOMER } from 'src/app/utils/messagesCustomer';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.scss']
})
export class RegisterCustomerComponent {
  constructor(private formBuilde: FormBuilder, private apiCustomerService: ApiCustomerService, private router: Router) { }
  submit = false;
  registerCustomer: FormGroup | any;
  Validate_form_register = VALIDATE_FORM_REGISTER;
  data: {} | any;
  password_and_again_password_difference: string | any;

  ngOnInit() {
    this.registerCustomer = this.formBuilde.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      numberphone: ['', Validators.compose([Validators.required, Validators.maxLength(12)])],
      date_of_day: ['', Validators.compose([Validators.required])],
      set: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required, Validators.maxLength(300)])],
      name_login: ['', Validators.compose([Validators.required, Validators.maxLength(12)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      again_password: ['', Validators.compose([Validators.required])]
    })
  }

  onSubmit(registerCustomer: FormGroup) {
    this.submit = true;
    let first_name = registerCustomer.value.first_name;
    let last_name = registerCustomer.value.last_name;
    let email = registerCustomer.value.email;
    let numberphone = registerCustomer.value.numberphone;
    let date_of_day = registerCustomer.value.date_of_day;
    let set = registerCustomer.value.set;
    let address = registerCustomer.value.address;
    let name_login = registerCustomer.value.name_login;
    let password = registerCustomer.value.password;
    let again_password = registerCustomer.value.again_password;
    if (first_name && last_name && email && numberphone && date_of_day && address && name_login && password && again_password) {
      this.data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        numberphone: numberphone,
        date_of_day: date_of_day,
        set: set,
        address: address,
        name_login: name_login,
        password: password,
        again_password: again_password
      }
      if (numberphone.length <= 12 && name_login.length < 12 && password.length >= 6 || password.length <= 12) {
        if (password === again_password) {
          this.password_and_again_password_difference = '';

          ToastSuccess(MESS_CREATE_CONFIRM("tài khoản thành công!"), 1000).then((res: any) => {
            this.apiCustomerService.createCustomer(this.data).subscribe(res => {
              if (res) {
                this.router.navigateByUrl('/clients/login_customer');
              }
              else {
                this.handleErorr(CREATE_CUSTOMER.error, 2000);
              }
            })
          });

        }
        else {
          this.password_and_again_password_difference = this.Validate_form_register.password_and_again_password_difference;
        }
      }
      else {
        return;
      }
    }
    else {
      return;
    }
  }

  handleSuccess(text: string, timeout: number) {
    ToastSuccess(text, timeout);
  }

  handleErorr(text: string, timeout: number) {
    ToastError(text, timeout)
  }

  andleStyleError(name: any) {
    const { touched, hasError } = this.registerCustomer.controls[`${name}`];
    return {
      'is-invalid': touched && hasError('required'),
      'is-valid': touched && !hasError('required'),
      'form-control': true,
    };
  }
}
