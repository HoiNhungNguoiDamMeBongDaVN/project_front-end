import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiProductsService } from 'src/app/services/api_products/api-product.service';

@Component({
  selector: 'app-product-men',
  templateUrl: './product-men.component.html',
  styleUrls: ['./product-men.component.scss']
})
export class ProductMenComponent implements OnInit {

  constructor(private httpClient:ApiProductsService) { }



  p:number=0;
  i:number=5;

  product_list:[]|any;
  product_list_men: any[] = [];
  @Input() childMessage:string | undefined;

  public searchName = new Subject<string>();


  public fillterName = '';

  ngOnInit(): void {
    this.getData();
  } 

  getData(){ 
    this.httpClient.getAllProduct().subscribe(data =>{
      this.product_list=data;
      this.product_list.forEach((element:any) => {
        if(element.set=="nam"){
          this.product_list_men.push(element);
        }
      });
    })
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
