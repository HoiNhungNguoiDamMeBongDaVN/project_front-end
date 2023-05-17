import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/product.model';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(private active:ActivatedRoute,private editProduct:ApiProductsService,private router:Router) { }

  ngOnInit(): void {
    this.getProductAPI_ID();
  }
  product:product=new product();
  pro:any;

  getProductAPI_ID(){
    this.active.params.subscribe(data=>{
      console.log(data['ID'],"à há");
      this.editProduct.getProductDetail(data['ID']).subscribe(product=>{
        this.pro=product;
        console.log(product,"à há");
        
      });
    });
  }

  putProduct_API(x:NgForm){
    if(x.invalid){
      alert("Bạn cần nhập đầy đủ thông tin !");
    }
    else{
      this.EditProduct_API(x);
    }
  }

  EditProduct_API(x:any){
    this.active.params.subscribe(data=>{
        this.pro=data['ID'];
        this.editProduct.editProduct(this.pro,x).subscribe(data=>{
          this.router.navigateByUrl("/admins/manage_product");
        })
        
      });
    
    
  }
}
