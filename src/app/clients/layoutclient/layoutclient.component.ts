import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { search } from 'src/app/models/searchProduct.model';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';
import { SearchProductService } from 'src/app/services/search_product/search-product.service';
@Component({
  selector: 'app-layoutclient',

  templateUrl: './layoutclient.component.html',
  styleUrls: ['./layoutclient.component.scss'],

})
export class LayoutclientComponent implements OnInit {
  parentMessage: string = "";
  searchNameProduct: '' | any;
  constructor(private router: Router, private searchProduct: SearchProductService) { }


  search: search = new search();
  ngOnInit(): void {
    //this.receiveMessage();
  }

  receiveMessage() {
    this.searchProduct.searchProduct(this.searchNameProduct);
    this.searchNameProduct = '';
    this.router.navigateByUrl('product_search');
  }
}
