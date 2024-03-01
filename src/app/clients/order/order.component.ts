import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { checkOut } from 'src/app/models/check.model';
import { OrderCustomerService } from 'src/app/services/api_order/order-customer.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(private orderCart: OrderCustomerService) { }

  open: boolean = false;

  checkout: checkOut = new checkOut();

  listOderCart: checkOut[] = [];
  ngOnInit(): void {
    this.loadOrderCart();
  }

  loadOrderCart() {
    this.listOderCart = this.orderCart.loadCartOder();
    this.totalMoneyOrder();
  }

  openCartOrder() {
    this.open = !this.open;
  }

  totalMoneyOrder() {
    let totalProduct = 0;
    let totalPrice = 0;
    let totalPriceSale = 0;
    for (let x = 0; x < this.listOderCart.length; x++) {
      const element = this.listOderCart[x];
      for (let i = 0; i < element.carts.length; i++) {
        const e = element.carts[i];
        this.checkout.carts.push(e);
        totalPrice += e.price * e.amount;
        totalPriceSale += (e.price * e.amount) * ((100 - e.sale) / 100);
        totalProduct += e.amount;
      }
    }
    this.checkout.totalAmount = totalProduct;
    this.checkout.totalPriceProduct = totalPrice;
    this.checkout.totalPriceProductSale = totalPriceSale;
  }



  pushOrder() {
    this.orderCart.createOrder(this.checkout);
  }

  order(x: NgForm) {
    if (x.invalid) {
      alert("Bạn cần nhập đầy đủ thông tin !");
    }
    else {
      alert("Đơn hàng của bạn đã hoàn tất !");
      this.pushOrder();
      location.replace('/product_women');
      this.checkout = new checkOut();
      localStorage.removeItem(this.orderCart.KEY_cart);
    }
  }

}
