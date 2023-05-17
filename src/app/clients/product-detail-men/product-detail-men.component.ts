import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';

@Component({
  selector: 'app-product-detail-men',
  templateUrl: './product-detail-men.component.html',
  styleUrls: ['./product-detail-men.component.scss']
})
export class ProductDetailMenComponent {
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
