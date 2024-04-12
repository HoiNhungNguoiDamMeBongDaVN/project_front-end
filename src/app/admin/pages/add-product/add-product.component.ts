import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { product } from 'src/app/models/product.model';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';
import { VALIDATOR_ADD_PRODUCT } from "../../../utils/messages";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiCloudImageService } from 'src/app/services/api_image_cloud/api-cloud-image.service';
import { MESS_CREATE_CONFIRM, ToastError, ToastSuccess } from 'src/app/utils/alert';
import { CheckDeactivate } from 'src/app/interfaces/check-deactivate';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, CheckDeactivate {
  editorForm: any;
  form: FormGroup;
  submit = false;
  checked = false;
  isFormDirty = false;


  constructor(private apiProduct: ApiProductsService, private router: Router, private fb: FormBuilder, private apiCloudImage: ApiCloudImageService) {
    this.form = this.fb.group({
      name_pro: ['', Validators.compose([Validators.required])],
      type_sex: ['', Validators.compose([Validators.required])],
      image: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      sale: ['', Validators.compose([Validators.required])],
      quantity: ['', Validators.compose([Validators.required])],
      des: ['', Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])]
    });
    this.form.valueChanges.subscribe(() => {
      this.isFormDirty = true;
    });
  }

  converImage: any;

  product: product = new product();
  Validate_form = VALIDATOR_ADD_PRODUCT;
  selectedOption: any;
  listGetColor: any[] = [];
  listGetSize: any[] = [];

  errorValidateSize: string | any;
  errorValidateColor: string | any
  errorValidateTypeProduct: string | any;

  listColor: [] | any;
  listSize: [] | any;

  data: {} | any;


  ngOnInit() {

    this.getAllColor();
    this.getAllsize();
  }

  ngOnchange() {
    this.getAllColor();
    this.getAllsize();
  }

  getAllColor() {
    this.apiProduct.getAllColor().subscribe(res => {
      try {
        if (res && res.errCode === 0) {
          this.listColor = res.data;
        }
      } catch (error) {
        throw error;
      }
    });
  }

  getAllsize() {
    this.apiProduct.getAllSize().subscribe(res => {
      try {
        if (res && res.errCode === 0) {
          this.listSize = res.data;
        }
      } catch (error) {
        throw error;
      }
    });
  }

  getSizeValue(size: any) {
    size.isChecked = !size.isChecked;
    if (size.isChecked) {
      this.listGetSize.push(size.name_s);
    } else {
      const index = this.listGetSize.indexOf(size.name_s);
      if (index !== -1) {
        this.listGetSize.splice(index, 1);
      }
    }
  }

  getColorValue(color: any) {
    color.isChecked = !color.isChecked;
    if (color.isChecked) {
      let convertColor = {
        name_c: color.name_c,
        idcolor: color.idcolor,
        isChecked: false,
        code_color: color.code_color
      }
      this.listGetColor.push(convertColor);
    } else {
      const index = this.listGetColor.indexOf(color);
      if (index !== -1) {
        this.listGetColor.splice(index, 1);
      }
    }
  }

  handleImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.converImage = reader.result;
    };
  }

  addProduct_API(form: FormGroup) {
    this.submit = true;
    let name_pro = form.value.name_pro;
    let type_pro_sex = form.value.type_sex;
    let image_pro = form.value.image;
    let price = form.value.price;
    let sale = form.value.sale;
    let quantity = form.value.quantity;
    let desprohtml = form.value.des;
    let status_pro = form.value.status;
    let color = this.listGetColor;
    let size = this.listGetSize;
    console.log(form.value, "me may");

    if (color.length <= 0 || size.length <= 0 || !type_pro_sex || !name_pro || !image_pro || !price || !sale || !quantity || !desprohtml || !status_pro || !color || !size) {
      this.errorValidateColor = VALIDATOR_ADD_PRODUCT.color;
      this.errorValidateTypeProduct = VALIDATOR_ADD_PRODUCT.type_sex;
      this.errorValidateColor = VALIDATOR_ADD_PRODUCT.size;
    }
    else {
      this.apiCloudImage.pushImageCloud({ data: this.converImage }).subscribe(image => {

        if (image && image.errCode === 0) {
          this.data = {
            name_pro: name_pro,
            type_pro_sex: type_pro_sex,
            image_pro: image.data.url,
            price: price,
            sale: sale,
            quantity: quantity,
            desprohtml: desprohtml,
            status_pro: status_pro,
            color: JSON.stringify(color),
            size: JSON.stringify(size)
          }
          this.apiProduct.addProduct({ data: this.data }).subscribe(res => {
            if (res) {
              this.isFormDirty = false;
              this.handleSuccess(MESS_CREATE_CONFIRM('sản phẩm thành công!'), 1000);
              this.router.navigateByUrl('/admins/manage_product');
            }
            else {
              this.handleErorr(MESS_CREATE_CONFIRM('sản phẩm thất bại!'), 1000);
            }
          })
        }
        else {
          this.handleErorr(MESS_CREATE_CONFIRM('sản phẩm thất bại!'), 1000);
        }
      })
    }

  }

  handleSuccess(text: string, timeout: number) {
    ToastSuccess(text, timeout);
  }

  handleErorr(text: string, timeout: number) {
    ToastError(text, timeout)
  }

  andleStyleError(name: any) {
    const { touched, hasError } = this.form.controls[`${name}`];
    return {
      'is-invalid': touched && hasError('required'),
      'is-valid': touched && !hasError('required'),
      'form-control': true,
    };
  }



  checkDeactivate(): Observable<boolean> {
    if (!this.isFormDirty) {
      return of(true);
    }

    const isAddProduct = JSON.stringify(this.form.value) !== JSON.stringify(null);
    return of(!isAddProduct || confirm('Bạn có muốn thoát khỏi trang này?'));
  }

}
