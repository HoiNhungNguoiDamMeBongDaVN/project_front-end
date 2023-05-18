import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';

@Component({
  selector: 'app-product-kid-detail',
  templateUrl: './product-kid-detail.component.html',
  styleUrls: ['./product-kid-detail.component.scss']
})
export class ProductKidDetailComponent {

  constructor(private router:ActivatedRoute,private httpClient:ApiProductsService) { }
  proDetail:{}|any;
 
  ngOnInit(): void {
    this.productDetail();
  }

  productDetail(){
    this.router.params.subscribe(data=>{
      this.httpClient.getProductDetail(data['ID']).subscribe(data=>{
        console.log(data);
        
        this.proDetail=data;
      })
    })
  }

}
