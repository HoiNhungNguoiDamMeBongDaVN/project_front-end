import { Component } from '@angular/core';
import { debounceTime, startWith, switchMap } from 'rxjs';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';
import { SendDataService } from 'src/app/services/senddata/send_data.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent {
  sendSearch: string | any;
  listProductSearch: any[] = [];
  p: number = 0;
  i: number = 5;
  listGetSize: any[] = [];
  listGetColor: any[] = [];
  listColor: any[] = [];
  listSize: any[] = [];
  checked = false;
  constructor(private searchProduct: SendDataService, private productService: ApiProductsService) {
    this.searchProduct.data$.subscribe((data: any) => {
      this.sendSearch = data;
      this.getProductSearch();
    })
  }

  ngOnInit(): void {
    this.getAllSize();
    this.getAllColor();
  }

  getProductSearch() {
    try {
      if (this.sendSearch) {
        this.productService.searchProduct({ data: this.sendSearch }).subscribe(data => {
          if (data && data.errCode === 0) {
            this.listProductSearch = data.data;
          }
        }, error => {
          console.error('An error occurred while fetching product data:', error);
        });
      }
      return;
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
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

  getColorValue(color: any) {
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

  filterAndSearchProduct() {
    let data = {};
    if (this.listGetSize.length > 0 || this.listGetColor.length > 0) {
      data = {
        size: this.listGetSize,
        color: this.listGetColor,
        titleSearch: this.sendSearch
      };
      this.productService.filterAndSearchProduct({ data: data }).subscribe((data: any) => {
        if (data && data.errCode === 0) {
          this.listProductSearch = data.data;
        }
      })
    }
  }

  pageChangeEvent(event: number) {
    this.p = event;
  }

}
