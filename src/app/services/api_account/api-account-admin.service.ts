import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { accountAdmin } from '../../models/account_admin.model';
import { environment } from "../../../environments/environment";
import {ACCOUNT} from "../enpoint"
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAccountAdminService {

  constructor(private httpClient:HttpClient) { }

  listAccount:[]|any;
  curentAccount:accountAdmin|any;


  getAllAccount():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.get<any>(`${environment.api}/${ACCOUNT}`,{headers:headers}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  addAccount(data:accountAdmin):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.post(`${environment.api}/${ACCOUNT}`,data,{headers:headers}).pipe(
      catchError((err)=>{
        return throwError(err);
      })
    )
  }

  deleteAccount(id:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.delete(`${environment.api}/${ACCOUNT}/${id}`,{headers:headers}).pipe(
      catchError((err)=>{
        return throwError(err);
      })
    )
  }

  checkAccountAdmin(account:accountAdmin){
    return new Promise ((res,rej)=>{
      try {
        this.listAccount.forEach((element: { adminName: string, passwordAdmin:string; }) => {
          if(account.adminName==element.adminName && account.passwordAdmin==element.passwordAdmin){
            sessionStorage.setItem("curentAccount",JSON.stringify(account));
            res(account);
          }
        });  
      } catch (error) {
        rej(error);
      }
    })
  }

  checkAccountAdminGuard(){
    try {
        let strcurentAccount=sessionStorage.getItem("curentAccount");
        if(strcurentAccount && strcurentAccount.length>0){
          this.curentAccount=JSON.parse(strcurentAccount);
          return true;
        }
      }
    catch (error) {
        console.log(error);
      }
    return false;
  }
  

}
