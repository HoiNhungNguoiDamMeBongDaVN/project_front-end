import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { product } from 'src/app/models/product.model';
import { ApiAccountAdminService } from 'src/app/services/api_account/api-account-admin.service';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';
import { getAccountManager } from 'src/app/store/app.selectors';
import { MESS_DELETE_CONFIRM, ToastDeleteConfirm, ToastSuccess, ToastWarning, ToastError } from 'src/app/utils/alert';
import { DELETE } from 'src/app/utils/messages';
@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  constructor(private productAPI: ApiProductsService, private apiAccountAdminService: ApiAccountAdminService, private store: Store) { }

  manageProduct: product = new product();
  arrayProductAPI: [] | any;
  userAccount: any;
  ngOnInit(): void {
    // console.log("cc");

    // this.loadProductAPI();
    // this.store.pipe(select(getAccountManager)).subscribe((data: any) => {
    //   this.userAccount = data.user.access_token;
    //   if (this.userAccount) {
    //     console.log(this.userAccount, "??");
    //   }

    // })
  }



  loadProductAPI() {
    this.productAPI.getAllProduct().subscribe(data => {
      if (data && data.errCode === 0) {
        this.arrayProductAPI = data.data;
      }

    })
  }

  deleteProductItemAPI(id: string) {
    ToastDeleteConfirm(MESS_DELETE_CONFIRM("sản phẩm")).then((res: any) => {
      this.productAPI.deleteProduct(id).subscribe(data => {
        if (data) {
          this.handleSuccess(DELETE.delete_success, 2000);
          this.loadProductAPI();
        }
        else {
          this.handleErorr(DELETE.delete_error, 2000);
          this.loadProductAPI();
        }
      });
    });
  }


  handleSuccess(text: string, timeout: number) {
    ToastSuccess(text, timeout);
  }

  handleWarning(text: string, timeout: number) {
    ToastWarning(text, timeout)
  }

  handleErorr(text: string, timeout: number) {
    ToastError(text, timeout)
  }
}
