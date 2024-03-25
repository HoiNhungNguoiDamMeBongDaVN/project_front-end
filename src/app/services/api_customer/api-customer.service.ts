import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CREATE_CUSTOMER } from '../enpoint';
import { Observable, catchError, throwError } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ApiCustomerService {

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  createCustomer(data: Customer): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.post(`${environment.api}/${CREATE_CUSTOMER}`, data, { headers: headers }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  checkAccountCustomer(token: any) {
    return new Promise((res, rej) => {
      try {
        if (token) {
          sessionStorage.setItem("curentAccountCustomer", JSON.stringify(token));
          res(token);
        }
      } catch (error) {
        rej(error);
      }
    })
  }

  checkTokenExpiration(token: any) {
    // const token = sessionStorage.getItem("curentAccountCustomer");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      sessionStorage.removeItem('curentAccountCustomer');
      return false;
    }
  }

}
