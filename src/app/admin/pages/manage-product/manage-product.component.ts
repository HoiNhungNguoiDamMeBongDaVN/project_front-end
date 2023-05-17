import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/product.model';
import { ApiAccountAdminService } from 'src/app/services/api_account/api-account-admin.service';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  constructor(private productAPI:ApiProductsService, private apiAccountAdminService:ApiAccountAdminService) { } 

  manageProduct:product=new product();
  arrayProductAPI:[]|any;

  ngOnInit(): void {
    this.loadProductAPI();
    this.getaccount();
  }

  getaccount(){
    this.apiAccountAdminService.getAllAccount().subscribe((data)=>{
      console.log(data,"o day ne");
      
    })
  }

  loadProductAPI(){
    this.productAPI.getAllProduct().subscribe(data=>{
      this.arrayProductAPI=data;
    })
  }

  deleteProductItemAPI(id:string){
    console.log(id,"id ne");
    
    if(confirm("Bạn có muốn xóa sản phẩm này không ?")){
      this.productAPI.deleteProduct(id).subscribe(data=>{
        this.loadProductAPI();
      });
      // location.reload();
    }
  }

}
