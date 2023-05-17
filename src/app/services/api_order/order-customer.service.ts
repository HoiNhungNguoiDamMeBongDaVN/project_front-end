import { Injectable } from '@angular/core';
import { checkOut } from '../../models/check.model';

@Injectable({
  providedIn: 'root'
})
export class OrderCustomerService {
  KEY_cart="pushCart";
  KEY_order="orderCustomer"
  listCart: any;
  listOrder:any;
  constructor() { }

  createCartOder(order:checkOut){
    let listCart=this.loadCartOder();
    listCart.push(order);
    localStorage.setItem(this.KEY_cart,JSON.stringify(listCart));
  }

  loadCartOder(){
    try {
      let strLocal=localStorage.getItem(this.KEY_cart);
      if(strLocal&&strLocal!=""){
        return JSON.parse(strLocal);
      }
      else{
        return [];
      }
    } catch (error) {
      return [];
    }
  }

 createOrder(order:checkOut){
  order.id=Date.now() / 10000000|0;
  let listOrder=this.loadOrder();
  listOrder.push(order);
  localStorage.setItem(this.KEY_order,JSON.stringify(listOrder));
 }

 loadOrder(){
  try {
    let strLocal=localStorage.getItem(this.KEY_order);
    if(strLocal&&strLocal!=""){
      return JSON.parse(strLocal);
    }
    else{
      return [];
    }
  } catch (error) {
    return [];
  }
 }

}
