import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModuleChatModule } from './chats/module-chat/module-chat.module';
import { ClientModule } from './clients/client/client.module';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { HighlightDirective } from './directives/highlight.directive';
import { ManageLoginModule } from './manage_login/manage-module/manage-login.module';
import { ProductDetailMenComponent } from './clients/product-detail-men/product-detail-men.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    ProductDetailMenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientModule,
    AdminModule,
    ManageLoginModule,
    ModuleChatModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
