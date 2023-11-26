import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, distinctUntilChanged, pluck } from 'rxjs';
import { search } from 'src/app/models/searchProduct.model';
import { addItemCart } from 'src/app/store/app.action';

import { ApiProductsService } from 'src/app/services/api_products/api-product.service';
@Component({
  selector: 'app-product-women',
  templateUrl: './product-women.component.html',
  styleUrls: ['./product-women.component.scss']
})
export class ProductWomenComponent implements OnInit {


  constructor(private productService: ApiProductsService, private store: Store) { }

  @ViewChild(ProductWomenComponent) toggleButton: ElementRef<HTMLButtonElement> | any;


  p: number = 0;
  i: number = 5;
  listGetSize: any[] = [];
  listGetColor: any[] = [];
  product_list: any[] = [];
  listColor: any[] = [];
  listSize: any[] = [];
  listColorProduct: any[] = [];
  listSizeProduct: any[] = [];
  getColor: string | any;
  @Input() childMessage: string | undefined;

  public searchName = new Subject<string>();

  search: search = new search();

  public fillterName = '';
  product_list_women: any[] = [];
  isClassVisible: boolean = false;
  buttonStates: boolean[] = [];
  size: any[] = [];

  ngOnInit(): void {
    this.getProductWoment();
    this.getAllSize();
    this.getAllColor();
  }

  ngAfterViewInit() {

  }

  ngOnChanges() {
    this.getProductWoment();
  }

  getProductWoment() {
    this.productService.getAllProduct().subscribe((data: { errCode: number; data: any[]; }) => {
      if (data && data.errCode === 0) {
        this.product_list = data.data;
        this.product_list.forEach((element: any) => {
          if (element.type_pro_sex == "women") {
            this.product_list_women.push(element);
            this.listColorProduct = data.data[0].color;
            //get value default

          }
        });
      }
    })
  }

  getAllColor() {
    this.productService.getAllColor().subscribe((data: { errCode: number; data: any[]; }) => {
      if (data && data.errCode === 0) {
        this.listColor = data.data;
      }
    })
  }

  getAllSize() {
    this.productService.getAllSize().subscribe((data: { errCode: number; data: any[]; }) => {
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



  getColorValue(color: any, i: number) {
    color.isChecked = !color.isChecked;
    if (color.isChecked) {
      this.getColor = color;
      this.product_list_women[i].color.forEach((item: any) => {
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
        type_sex: "women"
      };
      this.productService.filterProduct({ data: data }).subscribe((data: { errCode: number; data: any[]; }) => {
        if (data && data.errCode === 0) {
          this.product_list_women = data.data;
        }
      })
    }
  }

  cancelFilterProduct() {
    if (this.listGetSize.length > 0 || this.listGetColor.length > 0) {
      this.product_list_women = [];
      this.getProductWoment();
      this.listGetSize = [];
      this.listGetColor = [];
      
    }
  }

  loadRouter() {
    location.replace("/clients/cart");
  }


  addCart(product: any, size: any) {
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

  toggleButtonState(index: number) {
    this.buttonStates[index] = !this.buttonStates[index];
  }

  pageChangeEvent(event: number) {
    this.p = event;
  }

}
