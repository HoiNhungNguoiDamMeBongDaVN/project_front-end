import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/product.model';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';
import { VALIDATOR_ADD_PRODUCT } from "../../../utils/messages";
import { ApiCloudImageService } from 'src/app/services/api_image_cloud/api-cloud-image.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  form: FormGroup;
  listSize: [] | any;
  listSizeOld: [] | any;
  listColor: [] | any;
  listColorOld: [] | any;
  listColorUpdate: any[] = [];
  listSizeUpdate: any[] = [];
  imageOld: any;
  data: {} | any;

  constructor(private active: ActivatedRoute, private editProduct: ApiProductsService, private router: Router, private fb: FormBuilder, private apiCloudImage: ApiCloudImageService) {
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

  ngOnInit(): void {
    this.getProductAPI_ID();
    this.getAllColor();
    this.getAllSize()
  }

  converImage: any;

  product: product = new product();
  pro: [] | any;
  Validate_form = VALIDATOR_ADD_PRODUCT;

  getProductAPI_ID() {
    this.active.params.subscribe(data => {
      this.editProduct.getProductDetail(data['ID']).subscribe(product => {
        if (product && product.errCode === 0) {
          [this.pro] = product.data;
          if (this.pro) {
            this.form.patchValue({
              name_pro: this.pro.name_pro,
              type_sex: this.pro.type_pro_sex,
              // image: this.pro.image_pro,
              price: this.pro.price,
              sale: this.pro.sale,
              quantity: this.pro.quantity,
              des: this.pro.desprohtml,
              status: this.pro.status_pro,
            });
            this.imageOld = this.pro.image_pro;
            this.listSizeOld = this.pro.size;
            this.listColorOld = this.pro.color;
          }
        }
      });
    });
  }

  getAllSize() {
    this.editProduct.getAllSize().subscribe(res => {
      try {
        if (res && res.errCode === 0) {
          this.listSize = res.data;
        }
      } catch (error) {
        throw error;
      }
    });
  }

  getAllColor() {
    this.editProduct.getAllColor().subscribe(res => {
      try {
        if (res && res.errCode === 0) {
          this.listColor = res.data;
        }
      } catch (error) {
        throw error;
      }
    });
  }

  handleImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.converImage = reader.result;
    };
  }

  andleStyleError(name: any) {
    const { touched, hasError } = this.form.controls[`${name}`];
    return {
      'is-invalid': touched && hasError('required'),
      'is-valid': touched && !hasError('required'),
      'form-control': true,
    };
  }


  getSizeValue(size: any) {
    this.listSizeUpdate.push(size);

  }

  getColorValue(color: any) {
    this.listColorUpdate.push(color);
  }
  putProduct_API(x: NgForm) {
    if (x.name == "") {
      alert("Bạn cần nhập đầy đủ thông tin !");
    }
    else {
      this.EditProduct_API(x);
    }
  }
  EditProduct_API(form: any) {
    this.apiCloudImage.pushImageCloud({ data: this.converImage }).subscribe(image => {
      if (image && image.errCode === 0) {
        this.data = {
          id: this.pro.idpro,
          name_pro: form.value.name_pro,
          type_pro_sex: form.value.type_sex,
          image_pro: image.data.url,
          price: form.value.price,
          sale: form.value.sale,
          quantity: form.value.quantity,
          desprohtml: form.value.des,
          status_pro: form.value.status,
          color: JSON.stringify(this.listColorUpdate),
          size: JSON.stringify(this.listSizeUpdate)
        }
        // console.log(this.data);

        this.editProduct.editProduct(this.data).subscribe(res => {
          if (res) {
            this.router.navigateByUrl('admins/manage_product');
            this.form.reset();
          }
        })
      }
    })
    // this.active.params.subscribe(data => {
    //   console.log(data, "ê");

    //   this.pro = data['ID'];
    //   this.editProduct.editProduct(this.pro, x).subscribe(data => {
    //     this.router.navigateByUrl("/admins/manage_product");
    //   })

    // });


  }
}
