import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, from } from 'rxjs';
import { partition } from 'rxjs/operators';
import { FunctionAlert } from 'src/app/function_alert/function_alert';
import { ApiCustomerService } from 'src/app/services/api_customer/api-customer.service';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';
import { addItemCart } from 'src/app/store/app.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-kid',
  templateUrl: './product-kid.component.html',
  styleUrls: ['./product-kid.component.scss']
})
export class ProductKidComponent {
  constructor(private productService: ApiProductsService, private functionAlert: FunctionAlert, private apiCustomerService: ApiCustomerService, private store: Store) { }



  p: number = 0;
  i: number = 5;

  checked = false;

  product_list: [] | any;
  product_list_kid: any[] = [];
  listColor: any[] = [];
  listSize: any[] = [];
  listGetSize: any[] = [];
  listGetColor: any[] = [];
  listColorProduct: any[] = [];
  // listProductFilter: any[] = [];
  getColor: string | any;
  dataSendApi: any[] = [];
  buttonStates: boolean[] = [];

  @Input() childMessage: string | undefined;



  ngOnInit(): void {
    this.getProductKid();
    this.getAllColor();
    this.getAllSize();
  }

  getProductKid() {
    this.productService.getAllProduct().subscribe((data: { errCode: number; data: any[]; }) => {
      if (data && data.errCode === 0) {
        const [womenProducts$, otherProducts$] = partition((product: any) => product.type_pro_sex === 'kid')(from(data.data));
        womenProducts$.subscribe((womenProduct: any) => {
          this.product_list_kid.push(womenProduct);
          this.listColorProduct = data.data[0].color;
        });
      }
    });
  }

  getAllColor() {
    this.productService.getAllColor().subscribe((data: any) => {
      if (data && data.errCode === 0) {
        this.listColor = data.data;
      }
    })
  }

  getAllSize() {
    this.productService.getAllSize().subscribe((data: any) => {
      if (data && data.errCode === 0) {
        this.listSize = data.data;
      }
    })
  }


  getSizeValueFilter(size: any) {
    size.isChecked = !size.isChecked;
    if (size.isChecked) {
      this.listGetSize.push(size.name_s);
    } else {
      const index = this.listGetSize.indexOf(size.name_s);
      if (index !== -1) {
        this.listGetSize.splice(index, 1);
      }
    }
  }

  getColorValueFilter(color: any) {
    color.isChecked = !color.isChecked;
    if (color.isChecked) {
      this.listGetColor.push(color.code_color);
    } else {
      const index = this.listGetColor.indexOf(color.code_color);
      if (index !== -1) {
        this.listGetColor.splice(index, 1);
      }
    }
  }

  getSizeValue(size: any) {
    size.isChecked = !size.isChecked;
    if (size.isChecked) {
      this.listGetSize.push(size.name_s);
    } else {
      const index = this.listGetSize.indexOf(size.name_s);
      if (index !== -1) {
        this.listGetSize.splice(index, 1);
      }
    }
  }


  getColorValue(color: any, i: number) {
    color.isChecked = !color.isChecked;
    if (color.isChecked) {
      this.getColor = color;
      this.product_list_kid[i].color.forEach((item: any) => {
        if (item !== color) {
          item.isChecked = false;
        }
      });
    }
    else {
      this.getColor = '';
    }
  }

  filterProduct() {
    let data = {};
    if (this.listGetSize.length > 0 || this.listGetColor.length > 0) {
      data = {
        size: this.listGetSize,
        color: this.listGetColor,
        type_sex: "kid"
      };
      this.productService.filterProduct({ data: data }).subscribe((data: any) => {
        if (data && data.errCode === 0) {
          this.product_list_kid = data.data;
        }
      })
    }
  }


  cancelFilterProduct() {
    if (this.listGetSize.length > 0 || this.listGetColor.length > 0) {
      this.product_list_kid = [];
      this.getProductKid();
      this.listGetSize = [];
      this.listGetColor = [];

    }
  }


  addCart(product: any, size: any) {
    let tokenCustomer = sessionStorage.getItem('curentAccountCustomer');
    if (tokenCustomer === null) {
      this.functionAlert.showAlertAndNavigate("Bạn cần đăng nhập để thực hiện chức năng này !", '/login_customer');
    }
    else {
      let checkTokenCustomer = this.apiCustomerService.checkTokenExpiration(tokenCustomer);
      if (checkTokenCustomer == true) {
        if (this.getColor !== undefined) {
          this.store.dispatch(addItemCart({
            item: {
              idpro: product.idpro,
              name_pro: product.name_pro,
              image_pro: product.image_pro,
              price: product.price,
              sale: product.sale,
              quantity: 1,
              color: this.getColor.name_c,
              size: size
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
              quantity: 1,
              color: product.color[0].name_c,
              size: size
            }
          }))
        }
      }
      else {
        this.functionAlert.showAlertAndNavigate("Phiên đăng nhập của bạn đã hết, vui lòng đăng  nhập lại !", '/login_customer');
      }
    }
  }

  loadRouter() {
    location.replace("/clients/cart");
  }



  toggleButtonState(index: number) {
    this.buttonStates[index] = !this.buttonStates[index];
  }

  pageChangeEvent(event: number) {
    this.p = event;
  }

}
