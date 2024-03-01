import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { ignoreElements, Observable } from 'rxjs';
import { ApiAccountAdminService } from '../services/api_account/api-account-admin.service';
import { AddProductComponent } from '../admin/pages/add-product/add-product.component';
import { CheckDeactivate } from '../interfaces/check-deactivate';

@Injectable({
  providedIn: 'root'
})
export class GuardLoginAdminGuard implements CanActivateChild, CanLoad, CanDeactivate<CheckDeactivate>  {
  constructor(private checkAccount: ApiAccountAdminService, private router: Router) {

  }
  canDeactivate(component: AddProductComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.checkDeactivate()
  }


  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.checkAccount.checkTokenExpiration()) {
      return true;
    }
    else {
      this.router.navigate(['/login_logout/login']);
      return false;
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.checkAccount.checkTokenExpiration()) {
      return true;
    }
    else {
      this.router.navigate(['/login_logout/login']);
      return false;
    }
  }



}
