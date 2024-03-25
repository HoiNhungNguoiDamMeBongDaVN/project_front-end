import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, of, pluck } from 'rxjs';
import { FunctionAlert } from 'src/app/function_alert/function_alert';
import { product } from 'src/app/models/product.model';
import { ApiCustomerService } from 'src/app/services/api_customer/api-customer.service';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';
import { addItemCart } from 'src/app/store/app.action';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  checked = false;
  checkedColor = false;
  listSizeConvert: any[] = [];
  listColor: any[] = [];
  proDetail: {} | any;
  proDetail$: Observable<any> | any;
  getSize: string | any;
  getColor: {} | any;
  quantity_product = 0;
  quantity_change = 1;

  constructor(private router: ActivatedRoute, private productService: ApiProductsService, private store: Store, private readonly route: ActivatedRoute, private apiCustomerService: ApiCustomerService, private functionAlert: FunctionAlert) { }

  ngOnInit(): void {
    this.productDetail();
    if (this.listColor.length > 0) {
      this.getColorValue(this.listColor[0]);
    }
  }
  ngAfterViewInit() {

  }

  productDetail() {
    this.router.params.subscribe((params: any) => {
      this.productService.getProductDetail(params['ID']).pipe(
        pluck('data')
      ).subscribe((productData: any) => {
        if (productData) {
          this.proDetail = productData;
          this.quantity_product = productData[0].quantity;
          this.listColor = productData[0]?.color;
          this.convertSize(productData[0]?.size);
          this.getColorValue(this.listColor);
        }
      });
    });
  }

  // productDetail() {
  //   this.proDetail$ = this.route.data.pipe(pluck('detail'));
  // }

  convertSize(array: Array<any>) {
    array.map((item: any) => {
      let object = {
        isChecked: 1,
        name_s: ''
      };
      object.name_s = item;
      object.isChecked = 0;
      this.listSizeConvert.push(object);
    });
  }


  getSizeValue(size: any) {
    size.isChecked = !size.isChecked;
    if (size.isChecked) {
      this.getSize = size.name_s;
      this.listSizeConvert.forEach(item => {
        if (item !== size) {
          item.isChecked = false;
        }
      });

    }
    else {
      this.getSize = '';
    }
  }

  getColorValue(color: any) {
    color.isChecked = !color.isChecked;

    if (color.isChecked) {
      this.getColor = color;
      this.listColor.forEach(item => {
        if (item !== color) {
          item.isChecked = false;
        }
      });

    } else {
      this.getColor = '';
    }
  }
  increment() {
    if (this.quantity_change < this.quantity_product) {
      this.quantity_change++;
    }
    else if (this.quantity_change == this.quantity_product) {
      this.quantity_change = this.quantity_product;
    }
  }

  decrement() {
    if (this.quantity_change > 1) {
      this.quantity_change--;
    }
    else if (this.quantity_change < 1) {
      this.quantity_change = 1;
    }
  }

  addCart(product: any) {
    let tokenCustomer = sessionStorage.getItem('curentAccountCustomer');
    if (tokenCustomer == null) {
      this.functionAlert.showAlertAndNavigate("Bạn cần đăng nhập để thực hiện chức năng này !", '/login_customer');
    }
    else {
      let checkTokenCustomer = this.apiCustomerService.checkTokenExpiration(tokenCustomer);
      if (checkTokenCustomer === true) {
        if (this.getColor.name_c !== undefined && this.getSize !== '') {
          this.store.dispatch(addItemCart({
            item: {
              idpro: product.idpro,
              name_pro: product.name_pro,
              image_pro: product.image_pro,
              price: product.price,
              sale: product.sale,
              quantity: this.quantity_change,
              color: this.getColor.name_c,
              size: this.getSize
            }
          }))
        }
        else {
          this.store.dispatch(addItemCart({
            item: {
              idpro: product.idpro,
              name_pro: product.name_pro,
              image_pro: product.image_pro,
              price: product.price,
              sale: product.sale,
              quantity: this.quantity_change,
              color: product.color[0].name_c,
              size: product.size[0]
            }
          }))
        }
      }
      else {
        this.functionAlert.showAlertAndNavigate("Phiên đăng nhập của bạn đã hết, vui lòng đăng  nhập lại !", '/login_customer');
      }
    }
  }

}
