import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navbarData } from './navdata';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { getAccountManager } from 'src/app/store/app.selectors';
import { Observable, of, switchMap, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ApiAccountSSOService } from 'src/app/services/api_SSO/api_sso.service';
import { doGetAccountnManage } from 'src/app/store/app.action';
import { forkJoin } from 'rxjs';
interface SidenavToggle {
  screenWith: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss']
})
export class LayoutAdminComponent implements OnInit {
  collapsed = true;
  navData = navbarData;
  // userAccountManage$: Observable<any[]> | undefined;
  userAccountManage$: any;
  userAccount = '';

  constructor(private activatedRoute: ActivatedRoute, private store: Store, private apiAccountSSOService: ApiAccountSSOService) {
  }

  listAPI = of([
    this.handleLoginUserSSO(),
    this.getAccountManager()
  ])

  ngOnInit(): void {

    forkJoin(this.listAPI);
  }

  @Output() onToggleSideNav: EventEmitter<SidenavToggle> = new EventEmitter();
  screenWith = 0;

  handleLoginUserSSO() {
    this.activatedRoute.queryParams.subscribe(params => {
      const ssoToken = params['SSOToken'];
      if (ssoToken) {
        this.apiAccountSSOService.LoginUserManagerSSO({ ssoToken }).subscribe(res => {
          if (res && res.errorCode === 0) {
            this.store.dispatch(doGetAccountnManage({
              user: {
                access_token: res.data.access_token,
                email: res.data.email,
                groupWithRoles: res.data.groupWithRoles,
                refresh_token: res.data.refresh_token,
                username: res.data.username
              }
            }));
          }

        })
      }

    });
  }



  getAccountManager() {
    this.store.pipe(select(getAccountManager)).subscribe((data: any) => {
      this.userAccount = data.user;
      if (this.userAccount === undefined) {
        this.apiAccountSSOService.getUserManagerSSO().subscribe((res) => {
          if (res) {
            this.store.dispatch(doGetAccountnManage({
              user: {
                access_token: res.data.access_token,
                email: res.data.email,
                groupWithRoles: res.data.groupWithRoles,
                refresh_token: res.data.refresh_token,
                username: res.data.username
              }
            }));
          }
        })
      }
    })
  }

  logoutAccount() {
    // sessionStorage.removeItem("curentAccountManager");
    // location.reload();
    window.location.href = `${environment.sso_login}?serviceURL=${environment.sso_current_url}`
  }
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWith: this.screenWith });
  }
  closeSidenav(): void {
    this.collapsed = false;
    // this.onToggleSideNav.emit({collapsed:this.collapsed, screenWith:this.screenWith});
  }
}
