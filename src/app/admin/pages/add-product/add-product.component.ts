import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/product.model';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';
import { VALIDATE_FORM_PRODUCT } from "../../../utils/messages";
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private addProduct:ApiProductsService, private router:Router) { }

  product:product=new product();
  Validate_form=VALIDATE_FORM_PRODUCT;
  ngOnInit(): void {
  }

  addProduct_API(data:product){
    if(data.name==""){
      this.addProduct.addProduct(data).subscribe(data=>{
        this.router.navigateByUrl('admins/manage_product');
      })
    }
    else{
      alert("Bạn phải hoàn thành FORM !");
    }
  }

}
