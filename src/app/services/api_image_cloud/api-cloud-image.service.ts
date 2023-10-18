import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { accountAdmin } from '../../models/account_admin.model';
import { environment } from "../../../environments/environment";
import { UPLOAD_IMAGE_CLOUD } from "../enpoint"
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCloudImageService {

  constructor(private httpClient: HttpClient) { }

  pushImageCloud(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.post<any>(`${environment.api}${UPLOAD_IMAGE_CLOUD}`, data, { headers: headers }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }
  // pushImageCloud(data: any) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  //     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  //   });
  //   console.log(data);
  //   return this.httpClient.post<any>(`${environment.api}/${UPLOAD_IMAGE_CLOUD}`, data, { headers: headers }).pipe(
  //     catchError((err) => {
  //       return throwError(err);
  //     })
  //   )
  // }
}
