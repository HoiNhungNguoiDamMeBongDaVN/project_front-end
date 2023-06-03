import { Injectable } from '@angular/core';
import { checkOut } from '../models/check.model';

@Injectable({
  providedIn: 'root'
})
export class SavelocalstorageService {

  constructor() {
    this.readCheckout();
   }
  checkout:checkOut=new checkOut;

  //save instance to localStorage
  saveCheckout(){
    localStorage.setItem('checkout',JSON.stringify(this.checkout));
  }

  //read instance to localStorage
  readCheckout(){
    try {
      let strCheckout=localStorage.getItem('checkout');
      if(strCheckout){
        this.checkout=JSON.parse(strCheckout);
      }
    } catch (error) {
      alert('Dữ liệu không hợp lệ'+error);
    }
  }

  saveCheckoutCart(){
    localStorage.setItem('checkoutCart',JSON.stringify(this.checkout));
  }

  readCheckoutCart(){
    try {
      let strCheckout=localStorage.getItem('checkoutCart');
      if(strCheckout){
        this.checkout=JSON.parse(strCheckout);
      }
    } catch (error) {
      alert('Dữ liệu không hợp lệ'+error);
    }
  }

}
