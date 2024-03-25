import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FunctionAlert } from 'src/app/function_alert/function_alert';
import { search } from 'src/app/models/searchProduct.model';
import { ApiCustomerService } from 'src/app/services/api_customer/api-customer.service';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';
import { SendDataService } from 'src/app/services/senddata/send_data.service';
@Component({
  selector: 'app-layoutclient',

  templateUrl: './layoutclient.component.html',
  styleUrls: ['./layoutclient.component.scss'],

})
export class LayoutclientComponent implements OnInit {
  parentMessage: string = "";
  searchNameProduct: '' | any;
  constructor(private router: Router, private searchProduct: SendDataService, private apiCustomerService: ApiCustomerService, private functionAlert: FunctionAlert) { }


  search: search = new search();
  ngOnInit(): void {
    // this.searchProduct.dataIconLoginLogout$.subscribe((data: any) => {
    //   console.log(data);
    // })
    // //this.receiveMessage();

  }

  ngOnChanges() {
    this.searchProduct.dataIconLoginLogout$.subscribe((data: any) => {
      console.log(data, "??");
    })
  }

  checkLoginCustomer() {
    let tokenCustomer = sessionStorage.getItem('curentAccountCustomer');
    let checkTokenCustomer = this.apiCustomerService.checkTokenExpiration(tokenCustomer);
    if (checkTokenCustomer == false) {
      this.router.navigate(['/login_customer']);
    }
    else {
      this.functionAlert.showConfirmAndNavigate("Bạn có muốn đăng xuất ?",'');
    }
  }

  receiveMessage() {
    this.searchProduct.searchProduct(this.searchNameProduct);
    this.searchNameProduct = '';
    this.router.navigateByUrl('product_search');
  }
}
