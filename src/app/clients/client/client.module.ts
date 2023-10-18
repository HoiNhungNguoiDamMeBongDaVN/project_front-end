import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { IndexsComponent } from '../indexs/indexs.component';
import { LayoutclientComponent } from '../layoutclient/layoutclient.component';
import { MyinformationComponent } from '../myinformation/myinformation.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductMenComponent } from '../product-men/product-men.component';
import { ProductWomenComponent } from '../product-women/product-women.component';
import { ClientRoutingModule } from '../client.routing';
import { OrderComponent } from '../order/order.component';
import { SortDirective } from 'src/app/directives/sort-data.directive';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductKidComponent } from '../product-kid/product-kid.component';
import {RouterModule} from '@angular/router';
import { ProductSearchComponent } from '../product-search/product-search.component';


@NgModule({
  declarations: [
    CartComponent,
    ProductDetailComponent,
    IndexsComponent,
    MyinformationComponent,
    ProductDetailComponent,
    LayoutclientComponent,
    ProductWomenComponent,
    ProductMenComponent,
    ProductKidComponent,
    ProductSearchComponent,
    OrderComponent,
    SortDirective,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule
   
  ]
})
export class ClientModule { }
