import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnrestrictedComponent } from './unrestricted/unrestricted.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { RestrictedComponent } from './restricted/restricted.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './sidenav/sidenav.component';



@NgModule({
  declarations: [UnrestrictedComponent, RestrictedComponent, NavbarComponent, SidenavComponent],
  imports: [
    LayoutRoutingModule,
    SharedModule,
  ]
})
export class LayoutModule { }
