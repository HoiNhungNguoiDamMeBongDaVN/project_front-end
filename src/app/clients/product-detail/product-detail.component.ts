import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/models/product.model';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  listSize:[]|any;
  proDetail:{}|any;
  constructor(private router:ActivatedRoute,private httpClient:ApiProductsService) { }
 
  ngOnInit(): void {
    this.productDetail();
  }

  productDetail(){
    this.router.params.subscribe(data=>{
      this.httpClient.getProductDetail(data['ID']).subscribe(data=>{
        if(data && data.errCode===0){
          this.proDetail=data.data;
          this.listSize = data.data[0].size;
        }
      })
    })
  }

}
