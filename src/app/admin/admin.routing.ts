import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardLoginAdminGuard } from '../guard/guard-login-admin.guard';
import { RegisterComponentAccount } from "./pages/register/register.component";
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ChartsAdminComponent } from './pages/charts-admin/charts-admin.component';
import { ChatsCustomerComponent } from './pages/chats-customer/chats-customer.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { LayoutAdminComponent } from './pages/layout-admin/layout-admin.component';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';
import { OrderCustomerComponent } from './pages/order-customer/order-customer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
    {
        path:"admins",
        component:LayoutAdminComponent,
        canActivateChild:[GuardLoginAdminGuard],
        children:[
            {
                path:"",
                redirectTo:"dashboard",
                pathMatch:"full" 
            },
            {
                path:"dashboard",
                component:DashboardComponent,
            },
            {
                path:"manage_product",
                component:ManageProductComponent,
            },
            {
                path:"add_product",
                component:AddProductComponent,
            },
            {
                path:"chats_customer",
                component:ChatsCustomerComponent
            },
            {
                path:"charts_admin",
                component:ChartsAdminComponent
            },
            {
                path:"order_cutomer",
                component:OrderCustomerComponent
            },
            {
                path:"edit_product/:ID",
                component:EditProductComponent
            },
            {
                path:"register",
                component:RegisterComponentAccount
            }
            
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
