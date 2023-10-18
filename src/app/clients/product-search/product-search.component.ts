import { Component } from '@angular/core';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';
import { SearchProductService } from 'src/app/services/search_product/search-product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent {
  sendSearch: string | any;
  listProductSearch: any[] = [];
  p:number=0;
  i:number=5;


  constructor(private searchProduct: SearchProductService, private productService: ApiProductsService) {
    this.searchProduct.data$.subscribe(data => {
      this.sendSearch = data;
      this.getProductSearch();
    })
  }

  ngOnInit(): void {
    // this.getProductSearch();
  }

  getProductSearch() {
    try {
      this.productService.searchProduct({ data: this.sendSearch }).subscribe(data => {
        if (data && data.errCode === 0) {
          this.listProductSearch = data.data;
        }
      }, error => {
        console.error('An error occurred while fetching product data:', error);
      });
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }

  pageChangeEvent(event:number){
    this.p=event;
  }

}
