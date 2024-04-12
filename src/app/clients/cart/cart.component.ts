import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { checkOut } from 'src/app/models/check.model';
import { product } from 'src/app/models/product.model';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';
import { OrderCustomerService } from 'src/app/services/api_order/order-customer.service';
import { SavelocalstorageService } from 'src/app/services/savelocalstorage.service';
import { Store } from '@ngrx/store';
import { selectItems } from 'src/app/store/app.selectors';
import { tap } from 'rxjs/operators';
import { deleteItemCart } from 'src/app/store/app.action';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  checkout: checkOut = new checkOut;
  // checkout:[]|any;
  public subscription: Subscription | undefined;
  product: product = new product();
  proDetail: {} | any;
  cart$: Observable<any[]> | undefined;
  totalPrice = 0;
  totalProduct = 0;
  totalIntoMoneyPro = 0;
  priceProvisional = 0;
  red = '#bb0606';
  constructor(private active: ActivatedRoute, private httpClient: ApiProductsService, private Savelocal: SavelocalstorageService, private orderCart: OrderCustomerService, private store: Store) { }
  ngOnInit(): void {
    this.getProduct();

  }

  // NGRX
  getProduct() {
    this.cart$ = this.store.select(selectItems).pipe(
      tap((cart: any) => { this.totalIntoMoneyPro = this.priceProvisional = this.sumPriceIntoMoneyPro(cart), this.totalPrice = this.sumPrice(cart), this.totalProduct = this.sumQuantity(cart) })
    );

    // this.cart$ = this.store.select(selectItems);
    // this.cart$.subscribe((data: any) => {
    //   console.log(data)
    // });

  }
  sumPrice(pro: any[]) {
    let sumPrice = 0;
    if (Array.isArray(pro)) {
      pro.forEach(item => {
        sumPrice += item.price * item.quantity;
      });
    }
    return sumPrice;
  }

  sumPriceIntoMoneyPro(pro: any[]) {
    let sumPrice = 0;
    if (Array.isArray(pro)) {
      pro.forEach(item => {
        if (item.sale > 0) {
          sumPrice += (Math.round((item.price) / 100 * (100 - item.sale))) * item.quantity;
        }
        else {
          sumPrice += item.price * item.quantity;
        }
      });
    }
    return sumPrice;
  }

  sumQuantity(pro: any[]) {
    let sumProduct = 0;
    console.log("??");

    if (Array.isArray(pro)) {
      pro.forEach(item => {
        sumProduct += item.quantity
      });
    }
    return sumProduct;
  }

  removeCartItem(item: any) {
    this.store.dispatch(deleteItemCart({ item }));
  }

}
