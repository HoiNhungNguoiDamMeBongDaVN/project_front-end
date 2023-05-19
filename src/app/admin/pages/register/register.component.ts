import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { accountAdmin } from 'src/app/models/account_admin.model';
import { ApiAccountAdminService } from 'src/app/services/api_account/api-account-admin.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Toast } from 'ngx-toastr';
import { MESS_DELETE_CONFIRM, ToastDeleteConfirm,ToastSuccess,ToastWarning,ToastError } from 'src/app/utils/alert';
import { ACCOUNT_LOGIN, ACCOUNT_SAVE, DELETE,VALIDATE_FORM_ACCOUNT } from 'src/app/utils/messages';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponentAccount implements OnInit{
  constructor(private addAccount:ApiAccountAdminService, private router:Router,private toastrService: ToastrService) { }
  accountManage:accountAdmin=new accountAdmin();

  listAccountRegister:any[] = [];
  arrayTest:any[]=[];
  account:any;
  count=0;
  ngOnInit(): void { 
    this.loadAccount();
    // this.chetExitAccount();
  }


  loadAccount(){
    this.addAccount.getAllAccount().subscribe(data=>{
      this.listAccountRegister=data;
      // console.log(data,"hfagfagfa");
      
    })
  }

  
  onRegister(data: any) {
    if(data.adminName==""){
        this.handleWarning(VALIDATE_FORM_ACCOUNT.name,1000);
    }
    else if(data.passwordAdmin==""){
      this.handleWarning(VALIDATE_FORM_ACCOUNT.pass,1000);
    }
    else{
      this.count=this.listAccountRegister.length;
      this.listAccountRegister.forEach((element: any) => {
        if(data.adminName != element.adminName){
          this.count-=1;
          this.handleWarning(ACCOUNT_LOGIN.account_exists,1000);
        }
      });
      if(this.count==0){
        this.addAccount.addAccount(data).subscribe(res=>{
              if(res){
                this.handleSuccess(ACCOUNT_SAVE.save_success,2000);
                this.loadAccount();
                return;
              }
            });
      }
      else if (this.account >0){
          this.handleWarning(ACCOUNT_LOGIN.account_exists,2000);
      }
    }
  }
  

  deleteAccount(id:string){
    ToastDeleteConfirm(MESS_DELETE_CONFIRM("account")).then((result:any)=>{
      this.addAccount.deleteAccount(id).subscribe(data=>{
        if(data.value){
          this.handleSuccess(DELETE.delete_success,2000);
          this.addAccount.listAccount=data;
          this.loadAccount();
        }
        else{
          this.handleErorr(DELETE.delete_error,2000);
          this.addAccount.listAccount=data;
        }
      });
    })
  }

  handleSuccess(text: string, timeout: number) {
    ToastSuccess(text,timeout);
  }

  handleWarning(text: string, timeout: number) {
    ToastWarning(text,timeout)
  }

  handleErorr(text:string,timeout:number){
    ToastError(text,timeout)
  }

}
