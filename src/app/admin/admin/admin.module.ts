import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from '../pages/add-product/add-product.component';
import { EditProductComponent } from '../pages/edit-product/edit-product.component';
import { ManageProductComponent } from '../pages/manage-product/manage-product.component';
import { OrderCustomerComponent } from '../pages/order-customer/order-customer.component';
import { ChatsCustomerComponent } from '../pages/chats-customer/chats-customer.component';
import { LayoutAdminComponent } from '../pages/layout-admin/layout-admin.component';
import { ChartsAdminComponent } from '../pages/charts-admin/charts-admin.component';
import { RegisterComponentAccount } from "../pages/register/register.component";
import { AdminRoutingModule } from '../admin.routing';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddProductComponent,
    EditProductComponent,
    ManageProductComponent,
    OrderCustomerComponent,
    ChatsCustomerComponent,
    LayoutAdminComponent,
    ChartsAdminComponent,
    RegisterComponentAccount
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
