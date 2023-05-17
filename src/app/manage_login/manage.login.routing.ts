import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterAccountComponent } from './register-account/register-account.component';

const routes: Routes = [
    {
        path:"login_logout",
        component:IndexComponent,
        children:[
            {
                path:"login",
                component:LoginComponent
            },
            {
                path:"register",
                component:RegisterAccountComponent
            }
            
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ManageLoginRoutingModule { }
