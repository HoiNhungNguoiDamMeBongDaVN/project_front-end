import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';

@Component({
  selector: 'app-product-men',
  templateUrl: './product-men.component.html',
  styleUrls: ['./product-men.component.scss']
})
export class ProductMenComponent implements OnInit {

  constructor(private productService:ApiProductsService) { }

  checked=false ;

  p:number=0;
  i:number=5;

  product_list:[]|any;
  product_list_men: any[] = [];
  listGetSize : any []=[];
  listGetColor : any []=[];
  listColor: any[] = [];
  listSize: any[] = [];

  @Input() childMessage:string | undefined;

  public searchName = new Subject<string>();


  public fillterName = '';

  ngOnInit(): void {
    this.getProductMent();
    this.getAllSize();
    this.getAllColor();
  } 

  getAllColor() {
    this.productService.getAllColor().subscribe((data:any) => {
      if (data && data.errCode === 0) {
        this.listColor = data.data;
      }
    })
  }

  getAllSize() {
    this.productService.getAllSize().subscribe((data:any) => {
      if (data && data.errCode === 0) {
        this.listSize = data.data;
      }
    })
  }

  getProductMent(){ 
    this.productService.getAllProduct().subscribe((data:any) =>{
      if(data && data.errCode === 0){
        this.product_list=data.data;
        this.product_list.forEach((element:any) => {
          if(element.type_pro_sex=="men"){
            this.product_list_men.push(element);
          }
        });
      }
    })
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
      this.listGetColor.push(color.code_color);
    } else {
      const index = this.listGetColor.indexOf(color.code_color);
      if (index !== -1) {
        this.listGetColor.splice(index, 1);
      }
    }
  }
  

  filterProduct() {
    let data = {};
    if (this.listGetSize.length > 0 || this.listGetColor.length > 0) {
      data = {
        size: this.listGetSize,
        color: this.listGetColor,
        type_sex: "men"
      };
      this.productService.filterProduct({ data: data }).subscribe((data:any) => {
        if (data && data.errCode === 0) {
          this.product_list_men = data.data;
        }
      })
    }
  }


  cancelFilterProduct() {
    if (this.listGetSize.length > 0 || this.listGetColor.length > 0) {
      this.product_list_men = [];
      this.getProductMent();
      this.listGetSize = [];
      this.listGetColor = [];

    }
  }
  loadRouter(){
    location.replace("/clients/cart");
  }

  // filterNameArray() { 
  //   this.searchName.pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged()).subscribe(childMessage => {
  //       this.search.searchNameProduct = childMessage.trim().toLowerCase();
  //       console.log(this.search.searchNameProduct);
  //       if (this.search.searchNameProduct.length > 0) {
  //           this.product_list_women = this.product_list_women.filter((data: { name: any; }) => data.name.toString().toLowerCase().includes(this.search.searchNameProduct));
  //       }
  //       if (this.search.searchNameProduct.length <= 0) { 
  //         this.getData();
  //       }
  //     });
  // }

  pageChangeEvent(event:number){
    this.p=event;
  }

}
