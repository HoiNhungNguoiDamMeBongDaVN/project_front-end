import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from '../chats/pages/chat/chat.component';
import { CartComponent } from './cart/cart.component';
import { IndexsComponent } from './indexs/indexs.component';
import { LayoutclientComponent } from './layoutclient/layoutclient.component';
import { MyinformationComponent } from './myinformation/myinformation.component';
import { OrderComponent } from './order/order.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductMenComponent } from './product-men/product-men.component';
import { ProductWomenComponent } from './product-women/product-women.component';
import { ProductKidComponent } from './product-kid/product-kid.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { LoginCustomerComponent } from './login-customer/login-customer.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { DetailResolver } from '../resolvers/detail.resolver';

const routes: Routes = [
    {
        path: "",
        component: LayoutclientComponent,
        children: [
            {
                path: "",
                redirectTo: "indexs",
                pathMatch: "full"
            },
            {
                path: "indexs",
                component: IndexsComponent,
            },
            {
                path: "product_women",
                component: ProductWomenComponent,
            },
            {
                path: "product_men",
                component: ProductMenComponent
            },
            {
                path: "product_kid",
                component: ProductKidComponent
            },
            {
                path: "cart",
                component: CartComponent
            },
            {
                path: "order",
                component: OrderComponent
            },
            {
                path: "product_detail",
                component: ProductDetailComponent
            },
            {
                path: "myinformation",
                component: MyinformationComponent
            },
            {
                path: "chat",
                component: ChatComponent
            },
            {
                path: "cart/:ID",
                component: CartComponent
            },
            {
                path: "product_search",
                component: ProductSearchComponent
            },
            {
                path: "login_customer",
                component: LoginCustomerComponent
            },
            {
                path: "register_customer",
                component: RegisterCustomerComponent
            },
            {
                path: "product_detail/:ID",
                component: ProductDetailComponent
            }
            // {
            //     path: "product_detail",
            //     component: ProductDetailComponent,
            //     resolve: {
            //         detail: DetailResolver
            //     }
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
