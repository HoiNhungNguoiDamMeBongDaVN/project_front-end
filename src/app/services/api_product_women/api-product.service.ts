import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {PRODUCT_WOMENT} from "../enpoint"
import { Observable, catchError, throwError } from 'rxjs';
import { product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class APIProductWomenService {

  constructor(private httpClient:HttpClient) { }

  getAllProduct_women():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.get<any>(`${environment.api}/${PRODUCT_WOMENT}`,{headers:headers}).pipe(
      catchError((err)=>{
        return throwError(err);
      })
    )
  }

  addProduct_women(data:product):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.post(`${environment.api}/${PRODUCT_WOMENT}`,data, { headers: headers }).pipe(
      catchError((err)=>{
        return throwError(err);
      })
    )
  }

  getProductDetail(id:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.get(`${environment.api}/${PRODUCT_WOMENT}/${id}`,{headers:headers}).pipe(
      catchError((err)=>{
        return throwError(err);
      })
    )
  }

  deleteProduct_women(id:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.delete(`${environment.api}/${PRODUCT_WOMENT}/${id}`,{headers:headers}).pipe(
      catchError((err)=>{
        return throwError(err);
      })
    )
  }

  editProduct_women(id:string,data:product):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.put(`${environment.api}/${PRODUCT_WOMENT}/${id}`,data,{headers:headers}).pipe(
      catchError((err)=>{
        return throwError(err);
      })
    )
  }

}
