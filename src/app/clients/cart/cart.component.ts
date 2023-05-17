import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { checkOut } from 'src/app/models/check.model';
import { product } from 'src/app/models/product.model';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';
import { OrderCustomerService } from 'src/app/services/api_order/order-customer.service';
import { SavelocalstorageService } from 'src/app/services/savelocalstorage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  
  checkout:checkOut=new checkOut;
  // checkout:[]|any;
  public subscription:Subscription | undefined;
  product:product=new product();
  proDetail:{}|any;

  constructor(private active:ActivatedRoute,private httpClient:ApiProductsService,private Savelocal:SavelocalstorageService,private orderCart:OrderCustomerService) { }
  ngOnInit(): void {
    this.readCheckoutCart();
    this.pushCart();
  }
  
  pushCart(){
    this.active.params.subscribe(data=>{
      this.httpClient.getProductDetail(data['ID']).subscribe(data=>{  
          this.proDetail=data;
          let old=this.chekExitsProduct(this.proDetail);
          if(!old){
            this.proDetail.amount=1;
            this.checkout.carts.push(this.proDetail);
          }
          this.countTotalPrice();
          this.saveCheckoutCart();
      });
    })
  }
  
  deleteItem(n:number,x:product){
    let total=this.chekExitsDelete(x);
    if(total){
      x.amount-=1;
      if(x.amount<=0){
        this.checkout.carts.splice(n,1);
      }
    }
    this.countTotalPrice();
    this.saveCheckoutCart();
    this.Savelocal.saveCheckout();
  }

  chekExitsProduct(product:product){
    for (let x = 0; x < this.checkout.carts.length; x++) {
      const element = this.checkout.carts[x];
      if(product.id_product==element.id_product){
        element.amount+=1;
        return element;
      }
    }
   return false;
  }

  chekExitsDelete(product:product){
    for (let x = 0; x < this.checkout.carts.length; x++) {
      const element = this.checkout.carts[x];
      if(product.id==element.id){
        return product;
      }
    }
    return false;
  }

  countTotalPrice(){
    let totalPrice=0;
    let totalProductSale=0;
    let totalAmont=0;
    for (let x = 0; x < this.checkout.carts.length; x++) {
      const element = this.checkout.carts[x];
      totalPrice+=(element.amount*element.price);
      totalProductSale+=(element.amount*element.price)*((100-element.sale)/100);
      totalAmont+=element.amount;
    }
    this.checkout.totalAmount=totalAmont;
    this.checkout.totalPriceProduct=totalPrice; 
    this.checkout.totalPriceProductSale=totalProductSale;
  }


  createOder(){
    this.orderCart.createCartOder(this.checkout);
    localStorage.removeItem("checkoutCart");
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
