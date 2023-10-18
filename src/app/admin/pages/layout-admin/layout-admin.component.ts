import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navbarData } from './navdata';

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

  constructor() { }

  collapsed = true;
  navData = navbarData;

  ngOnInit(): void {
  }
  @Output() onToggleSideNav: EventEmitter<SidenavToggle> = new EventEmitter();
  screenWith = 0;
  logoutAccount() {
    sessionStorage.removeItem("curentAccount");
    location.reload();
  }
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWith:this.screenWith});
  }
  closeSidenav(): void {
    this.collapsed = false;
    // this.onToggleSideNav.emit({collapsed:this.collapsed, screenWith:this.screenWith});
  }
}
