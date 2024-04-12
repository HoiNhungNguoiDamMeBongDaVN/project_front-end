import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { checkOut } from 'src/app/models/check.model';
import { OrderCustomerService } from 'src/app/services/api_order/order-customer.service';
import { selectItems } from 'src/app/store/app.selectors';
import { ApiOrderCustomerService } from 'src/app/services/api_order/apiOrderCustomer.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  form: FormGroup;
  constructor(private orderCart: OrderCustomerService, private fb: FormBuilder, private store: Store, private apiOrderCustomerService: ApiOrderCustomerService, private router: Router) {
    this.form = this.fb.group({
      fullName: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      province: ['', Validators.compose([Validators.required])],
      district: ['', Validators.compose([Validators.required])],
      ward: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      discountCode: [],
      methodPay: ['', Validators.compose([Validators.required])]
    });
  }

  open: boolean = false;
  cart$: Observable<any[]> | undefined;
  checkout: checkOut = new checkOut();

  listOderCart: checkOut[] = [];
  ngOnInit(): void {
    this.loadOrderCart();
  }

  loadOrderCart() {
    this.cart$ = this.store.select(selectItems);
    this.cart$.subscribe((data: any) => {
      this.listOderCart = data;
      // console.log(data, "??");

    });

    // this.listOderCart = this.orderCart.loadCartOder();
    this.totalMoneyOrder();
  }

  openCartOrder() {
    this.open = !this.open;
  }

  totalMoneyOrder() {
    console.log("cc", this.listOderCart);

    let totalProduct = 0;
    let totalPrice = 0;
    let totalPriceSale = 0;
    for (let x = 0; x < this.listOderCart.length; x++) {
      let element = this.listOderCart[x];
      totalPrice += element.price * element.quantity;
      totalPriceSale += (element.price * element.quantity) * ((100 - element.sale) / 100);
      totalProduct += element.quantity;
      // for (let i = 0; i < element.carts.length; i++) {
      //   const e = element.carts[i];
      //   this.checkout.carts.push(e);
      //   totalPrice += e.price * e.amount;
      //   totalPriceSale += (e.price * e.amount) * ((100 - e.sale) / 100);
      //   totalProduct += e.amount;
      // }
    }
    this.checkout.totalAmount = totalProduct;
    this.checkout.totalPriceProduct = totalPrice;
    this.checkout.totalPriceProductSale = totalPriceSale;
  }



  pushOrder() {
    this.orderCart.createOrder(this.checkout);
  }



  order(form: FormGroup) {
    if (form.value.fullName !== '' || form.value.province !== '' || form.value.district !== '' || form.value.ward !== '' || form.value.address !== '') {
      let data = {
        customer: form.value.fullName,
        product: this.listOderCart,
        address_delivery: [form.value.province, form.value.district, form.value.ward, form.value.address],
        method_pay: form.value.methodPay,
        discountCode: form.value.discountCode,
        quantity_pro: this.listOderCart.length,
        total_amount: this.checkout.totalPriceProductSale
      }
      this.apiOrderCustomerService.addOrderCustomer(data).subscribe(res => {
        if (res.errCode === 0) {
          alert("Đơn hàng của bạn đã hoàn tất !");
          this.router.navigate(['/indexs']);
        }
        else {
          alert("Đơn hàng của bạn đã bị lỗi !");
        }
      })


    }
    else {
      alert("Bạn cần điền đầy đủ thông tin!");
    }
  }

}
