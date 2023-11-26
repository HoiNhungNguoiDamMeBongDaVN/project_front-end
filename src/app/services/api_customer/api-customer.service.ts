import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CREATE_CUSTOMER } from '../enpoint';
import { Observable, catchError, throwError } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiCustomerService {

  constructor(private httpClient: HttpClient) { }

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
}
