import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { accountAdmin } from '../../models/account_admin.model';
import { environment } from "../../../environments/environment";
import { Observable, catchError, throwError, timeout } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store, select } from '@ngrx/store';
import { getAccountManager } from 'src/app/store/app.selectors';

@Injectable({
    providedIn: 'root'
})
export class ApiAccountSSOService {

    constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService, private store: Store) { }

    listAccount: [] | any;
    curentAccount: accountAdmin | any;

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        // 'Authorization':`Bearer  ${}`
    });

    LoginUserManagerSSO(SSOToken: any): Observable<any> {
        const requestOptions = {
            headers: this.headers,
            withCredentials: true  // Enable sending credentials (cookies) with the request
        };
        const timeoutValue = 5000;
        return this.httpClient.post<any>(`${environment.sso_veryfy_token}`, SSOToken, requestOptions).pipe(
            timeout(timeoutValue),
            catchError((err) => {
                return throwError(err);
            })
        )
    }


    getUserManagerSSO(): Observable<any> {
        let userAccount: any;
        this.store.pipe(select(getAccountManager)).subscribe((data: any) => {
            console.log(data.user.access_token);

            userAccount = data.user.access_token ? data.user.access_token : '';
        })
        const requestOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                // 'Authorization': `Bearer  ${userAccount}`
            }),
            withCredentials: true  // Enable sending credentials (cookies) with the request
        };
        const timeoutValue = 5000;
        return this.httpClient.get<any>(`${environment.sso_get_account}`, requestOptions).pipe(
            timeout(timeoutValue),
            catchError((err) => {
                return throwError(err);
            })
        )
    }


    //   checkAccountAdmin(token: accountAdmin) {
    //     return new Promise((res, rej) => {
    //       try {
    //         if (token) {
    //           sessionStorage.setItem("curentAccountManager", JSON.stringify(token));
    //           res(token);
    //         }
    //       } catch (error) {
    //         rej(error);
    //       }
    //     })
    //   }

    //   checkTokenExpiration() {
    //     const token = sessionStorage.getItem("curentAccountManager");

    //     if (token && !this.jwtHelper.isTokenExpired(token)) {
    //       return true;
    //     } else {
    //       sessionStorage.removeItem('curentAccountManager');
    //       return false;
    //     }
    //   }

}
