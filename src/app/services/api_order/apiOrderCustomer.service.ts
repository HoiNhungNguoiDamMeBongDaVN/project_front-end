import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ADD_ORDER } from '../enpoint';
import { Observable, catchError, throwError } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class ApiOrderCustomerService {

    constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

    addOrderCustomer(data: any): Observable<any> {
        console.log(data);
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        });
        return this.httpClient.post(`${environment.api}/${ADD_ORDER}`, data, { headers: headers }).pipe(
            catchError((err) => {
                return throwError(err);
            })
        )
    }


}
