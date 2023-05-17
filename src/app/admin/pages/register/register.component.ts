import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { accountAdmin } from 'src/app/models/account_admin.model';
import { ApiAccountAdminService } from 'src/app/services/api_account/api-account-admin.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Toast } from 'ngx-toastr';
import { MESS_DELETE_CONFIRM, ToastDeleteConfirm } from 'src/app/utils/alert';
import { ACCOUNT_LOGIN, ACCOUNT_SAVE, DELETE } from 'src/app/utils/messages';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponentAccount implements OnInit{
  constructor(private addAccount:ApiAccountAdminService, private router:Router,private toastrService: ToastrService) { }
  accountManage:accountAdmin=new accountAdmin();

  listAccountRegister:any[] = [];
  ngOnInit(): void { 
    this.loadAccount();
  }


  loadAccount(){
    this.addAccount.getAllAccount().subscribe(data=>{
      this.listAccountRegister=data;
      console.log(data,"hfagfagfa");
      
    })
  }

  
  onRegister(data:any){
    
    this.listAccountRegister.forEach((element: any) => {
      if(data.adminName===element.adminName || data.passwordAdmin===element.passwordAdmin){
        // this.handleWarning(ACCOUNT_LOGIN.account_exists,2000);
        return ;
      }
      else if (data.adminName!=element.adminName && data.passwordAdmin!=element.passwordAdmin){
        this.addAccount.addAccount(data).subscribe(res=>{
          if(res){
            // this.handleSuccess(ACCOUNT_SAVE.save_success,2000);
            this.loadAccount();
            return ;
          }
         
        });    
      }
    });
  }

  

  deleteAccount(id:string){
    
    ToastDeleteConfirm(MESS_DELETE_CONFIRM("account")).then((result:any)=>{
      this.addAccount.deleteAccount(id).subscribe(data=>{
        if(data){
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
    this.toastrService.success(text, '', {
      positionClass: 'toast-top-right',
      progressBar: true,
      timeOut: timeout,
    });
  }

  handleWarning(text: string, timeout: number) {
    this.toastrService.warning(text, '', {
      positionClass: 'toast-top-right',
      progressBar: true,
      timeOut: timeout,
    });
  }

  handleErorr(text:string,timeout:number){
    this.toastrService.error(text, '', {
      positionClass: 'toast-bottom-right',
      progressBar: true,
      timeOut: timeout,
    });
  }

}
