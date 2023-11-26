import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { accountAdmin } from '../../models/account_admin.model';
import { environment } from "../../../environments/environment";
import { ACCOUNT } from "../enpoint"
import { Observable, catchError, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ApiAccountAdminService {

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  listAccount: [] | any;
  curentAccount: accountAdmin | any;


  getAllAccount(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.get<any>(`${environment.api}/${ACCOUNT}`, { headers: headers }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  addAccount(data: accountAdmin): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.post(`${environment.api}/${ACCOUNT}`, data, { headers: headers }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  deleteAccount(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.delete(`${environment.api}/${ACCOUNT}/${id}`, { headers: headers }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  checkAccountAdmin(token: accountAdmin) {
    return new Promise((res, rej) => {
      try {
        if (token) {
          sessionStorage.setItem("curentAccountManager", JSON.stringify(token));
          res(token);
        }
      } catch (error) {
        rej(error);
      }
    })
  }

  checkTokenExpiration() {
    const token = sessionStorage.getItem("curentAccountManager");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      sessionStorage.removeItem('curentAccountManager');
      return false;
    }
  }

}
