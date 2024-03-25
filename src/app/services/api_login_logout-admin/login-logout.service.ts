import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { LOGIN_MANAGER, LOGIN_CUSTOMER } from "../enpoint";
import { Observable, catchError, throwError } from 'rxjs';
import { accountAdmin } from 'src/app/models/account_admin.model';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutService {

  constructor(private httpClient: HttpClient) { }

  getTokenManager(data: accountAdmin): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.post(`${environment.api}/${LOGIN_MANAGER}`, data, { headers: headers }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  getTokenCustomer(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.post(`${environment.api}${LOGIN_CUSTOMER}`, data, { headers: headers }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

}
