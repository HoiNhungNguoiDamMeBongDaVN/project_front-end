import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { accountAdmin } from 'src/app/models/account_admin.model';
import { ApiAccountAdminService } from 'src/app/services/api_account/api-account-admin.service';
import { ToastrService } from 'ngx-toastr';
import { MESS_DELETE_CONFIRM, ToastDeleteConfirm } from 'src/app/utils/alert';
import { ACCOUNT_LOGIN, DELETE,ACCOUNT_SAVE } from 'src/app/utils/messages';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit {

  constructor(private addAccount:ApiAccountAdminService, private router:Router,private toastrService:ToastrService) { }
  accountManage:accountAdmin=new accountAdmin();

  listAccountRegister:[]|any;
  ngOnInit(): void { 
    this.loadAccount();
  }


  loadAccount(){
    this.addAccount.getAllAccount().subscribe(data=>{
      this.listAccountRegister=data;
      console.log(data,"hfagfagfa");
      
    })
  }

  
  onRegister1(data:accountAdmin){
    this.listAccountRegister.forEach((element: any) => {
      if(data.adminName==element.adminName && data.passwordAdmin==element.passwordAdmin){
        // this.handleWarning(ACCOUNT_LOGIN.account_exists,2000);
        console.log("no")
      }
     else{
        this.addAccount.addAccount(data).subscribe(res=>{
          if(res.value){
            // this.handleSuccess(ACCOUNT_SAVE.save_success,2000);
            console.log("yes")
          }
          else{
            // this.handleErorr(ACCOUNT_SAVE.save_error,2000);
            console.log("no")
          }
        });
     }
    });
  }


  xoa(id:number){
    // if(confirm("Bạn có muốn xóa Account này không ?")){
    //   this.addAccount.deleteAccount(id).subscribe(data=>{
    //     this.addAccount.listAccount=data;
    //   });
    //   location.reload();
    // }
    // ToastDeleteConfirm(MESS_DELETE_CONFIRM("account")).then((result:any)=>{
    //   this.addAccount.deleteAccount(id).subscribe(data=>{
    //     if(data.value){
    //       this.handleSuccess(DELETE.delete_success,2000);
    //       this.addAccount.listAccount=data;
    //     }
    //     else{
    //       this.handleErorr(DELETE.delete_error,2000);
    //       this.addAccount.listAccount=data;
    //     }
    //   });
    // })
  }


  // handleSuccess(text: string, timeout: number) {
  //   this.toastrService.success(text, '', {
  //     positionClass: 'toast-bottom-right',
  //     progressBar: true,
  //     timeOut: timeout,
  //   });
  // }

  // handleWarning(text: string, timeout: number) {
  //   this.toastrService.warning(text, '', {
  //     positionClass: 'toast-bottom-right',
  //     progressBar: true,
  //     timeOut: timeout,
  //   });
  // }

  // handleErorr(text:string,timeout:number){
  //   this.toastrService.error(text, '', {
  //     positionClass: 'toast-bottom-right',
  //     progressBar: true,
  //     timeOut: timeout,
  //   });
  // }

}
