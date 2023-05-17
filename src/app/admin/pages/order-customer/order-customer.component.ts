import { Component, OnInit } from '@angular/core';
import { checkOut } from 'src/app/models/check.model';
import { OrderCustomerService } from 'src/app/services/api_order/order-customer.service';

@Component({
  selector: 'app-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.scss']
})
export class OrderCustomerComponent implements OnInit {

  constructor(private orderCustomer:OrderCustomerService) { }

  listOrderCustomer_Admin:checkOut[]=[];

  order:checkOut=new checkOut();

  ngOnInit(): void {
    this.loadOrderCustomer(); 
  }

  loadOrderCustomer(){
    this.listOrderCustomer_Admin=this.orderCustomer.loadOrder();
  }

  deleteOrder(x:checkOut,n:number){
    if(confirm("Bạn có muốn xóa đơn hàng này ko ?")){
      this.listOrderCustomer_Admin.splice(n,1);
      localStorage.setItem(this.orderCustomer.KEY_order,JSON.stringify(this.listOrderCustomer_Admin));
    }
  }

  deleteAllOrder(){
    localStorage.removeItem(this.orderCustomer.KEY_order);
  }
}
