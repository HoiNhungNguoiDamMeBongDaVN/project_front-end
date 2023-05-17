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

  proDetail:{}|any;
  constructor(private router:ActivatedRoute,private httpClient:ApiProductsService) { }
 
  ngOnInit(): void {
    this.productDetail();
  }

  productDetail(){
    this.router.params.subscribe(data=>{
      console.log(data['ID'],"d dầyc");
      
      this.httpClient.getProductDetail(data['ID']).subscribe(data=>{
        console.log(data);
        
        this.proDetail=data;
      })
    })
  }

}
