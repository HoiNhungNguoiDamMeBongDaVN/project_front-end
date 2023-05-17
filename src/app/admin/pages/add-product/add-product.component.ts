import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/product.model';
import { APIProductWomenService } from 'src/app/services/api_product_women/api-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private addProduct:APIProductWomenService, private router:Router) { }

  product:product=new product();

  ngOnInit(): void {
  }

  addProduct_API(data:product){
    if(data.name.length>0){
      this.addProduct.addProduct_women(data).subscribe(data=>{
        this.router.navigateByUrl('admins/manage_product');
      })
    }
    else{
      alert("Bạn phải hoàn thành FORM !");
    }
  }

}
