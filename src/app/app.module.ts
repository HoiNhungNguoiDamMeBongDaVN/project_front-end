import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModuleChatModule } from './chats/module-chat/module-chat.module';
import { ClientModule } from './clients/client/client.module';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HighlightDirective } from './directives/highlight.directive';
import { ManageLoginModule } from './manage_login/manage-module/manage-login.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { itemsReducerCart, userManager } from './store/app.reducer';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
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
    ToastrModule.forRoot(),
    StoreModule.forRoot({ cart: itemsReducerCart, user: userManager }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('curentAccountManager');
        },
        allowedDomains: ['example.com'], // (optional) Whitelist for CORS
        disallowedRoutes: ['example.com/api/auth/login'], // (optional) Blacklist for requests
      },
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
