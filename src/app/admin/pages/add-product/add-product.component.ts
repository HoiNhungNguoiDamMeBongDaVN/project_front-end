import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/product.model';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';
import { VALIDATOR_ADD_PRODUCT } from "../../../utils/messages";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiCloudImageService } from 'src/app/services/api_image_cloud/api-cloud-image.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  editorForm: any;
  form: FormGroup;
  constructor(private apiProduct: ApiProductsService, private router: Router, private fb: FormBuilder, private apiCloudImage: ApiCloudImageService) {
    this.form = this.fb.group({
      name_pro: ['', Validators.compose([Validators.required])],
      type_sex: ['', Validators.compose([Validators.required])],
      image: [''],
      price: ['', Validators.compose([Validators.required])],
      sale: ['', Validators.compose([Validators.required])],
      quantity: ['', Validators.compose([Validators.required])],
      des: ['', Validators.compose([Validators.required])],
      status: ['']
    });
  }

  converImage: any;

  product: product = new product();
  Validate_form = VALIDATOR_ADD_PRODUCT;
  selectedOption: any;
  listGetColor: any[] = [];
  listGetSize: any[] = [];

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
    this.listGetSize.push(size.name_s);
  }

  getColorValue(color: any) {
    this.listGetColor.push(color);
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

    this.apiCloudImage.pushImageCloud({ data: this.converImage }).subscribe(image => {
      if (image && image.errCode === 0) {
        this.data = {
          name_pro: form.value.name_pro,
          type_pro_sex: form.value.type_sex,
          image_pro: image.data.url,
          price: form.value.price,
          sale: form.value.sale,
          quantity: form.value.quantity,
          desprohtml: form.value.des,
          status_pro: form.value.status,
          color: JSON.stringify(this.listGetColor),
          size: JSON.stringify(this.listGetSize)
        }
        this.apiProduct.addProduct({ data: this.data }).subscribe(res => {
          if (res) {

            this.router.navigateByUrl('admins/manage_product');
          }
        })
      }
      this.form.reset();
    })

  }

  andleStyleError(name: any) {
    const { touched, hasError } = this.form.controls[`${name}`];
    return {
      'is-invalid': touched && hasError('required'),
      'is-valid': touched && !hasError('required'),
      'form-control': true,
    };
  }
}
