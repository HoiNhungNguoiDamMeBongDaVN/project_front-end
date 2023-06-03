import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {PRODUCTS} from "../enpoint"
import { Observable, catchError, throwError } from 'rxjs';
import { product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {

  constructor(private httpClient:HttpClient) { }

  getAllProduct():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.get<any>(`${environment.api}/${PRODUCTS}`,{headers:headers}).pipe(
      catchError((err)=>{
        return throwError(err);
      })
    )
  }

  addProduct(data:product):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.post(`${environment.api}/${PRODUCTS}`,data, { headers: headers }).pipe(
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
    return this.httpClient.get(`${environment.api}/${PRODUCTS}/${id}`,{headers:headers}).pipe(
      catchError((err)=>{
        return throwError(err);
      })
    )
  }

  deleteProduct(id:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.delete(`${environment.api}/${PRODUCTS}/${id}`,{headers:headers}).pipe(
      catchError((err)=>{
        return throwError(err);
      })
    )
  }

  editProduct(id:string,data:product):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.httpClient.put(`${environment.api}/${PRODUCTS}/${id}`,data,{headers:headers}).pipe(
      catchError((err)=>{
        return throwError(err);
      })
    )
  }
}
