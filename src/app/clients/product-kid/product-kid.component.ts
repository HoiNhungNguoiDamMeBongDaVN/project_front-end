import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';

@Component({
  selector: 'app-product-kid',
  templateUrl: './product-kid.component.html',
  styleUrls: ['./product-kid.component.scss']
})
export class ProductKidComponent {
  constructor(private productService: ApiProductsService) { }



  p: number = 0;
  i: number = 5;

  product_list: [] | any;
  product_list_kid: any[] = [];
  listColor: any[] = [];
  listSize: any[] = [];
  listGetSize: any[] = [];
  listGetColor: any[] = [];
  // listProductFilter: any[] = [];
  dataSendApi: any[] = [];

  @Input() childMessage: string | undefined;



  ngOnInit(): void {
    this.getProductKid();
    this.getAllColor();
    this.getAllSize();
  }

  getProductKid() {
    this.productService.getAllProduct().subscribe(data => {
      if (data && data.errCode === 0) {
        this.product_list = data.data;
        this.product_list.forEach((element: any) => {
          if (element.type_pro_sex == "kid") {
            this.product_list_kid.push(element);
          }
        });
      }
    })
  }

  getAllColor() {
    this.productService.getAllColor().subscribe(data => {
      if (data && data.errCode === 0) {
        this.listColor = data.data;
      }
    })
  }

  getAllSize() {
    this.productService.getAllSize().subscribe(data => {
      if (data && data.errCode === 0) {
        this.listSize = data.data;
        console.log(this.product_list_kid);
        
      }
    })
  }

  getSizeValue(size: any) {
    this.listGetSize.push(size.name_s);
  }

  getColorValue(color: any) {
    this.listGetColor.push(color);
  }

  filterProduct() {
    let data = {};
    if (this.listGetSize.length > 0 || this.listGetColor.length > 0) {
      data = {
        size: this.listGetSize,
        color: this.listGetColor,
        type_sex: "kid"
      };
      this.productService.filterProduct({ data: data }).subscribe(data => {
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

  loadRouter() {
    location.replace("/clients/cart");
  }


  pageChangeEvent(event: number) {
    this.p = event;
  }

}
