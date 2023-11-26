import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ignoreElements, Observable } from 'rxjs';
import { ApiAccountAdminService } from '../services/api_account/api-account-admin.service';

@Injectable({
  providedIn: 'root'
})
export class GuardLoginAdminGuard implements CanActivateChild {
  constructor(private checkAccount:ApiAccountAdminService, private router:Router) {
    
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     if(this.checkAccount.checkTokenExpiration()){
       return true;
     }
     else{
      this.router.navigate(['/login_logout/login']);
      return false;
     }
  }
  
}
