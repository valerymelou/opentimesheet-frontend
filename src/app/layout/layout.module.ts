import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnrestrictedComponent } from './unrestricted/unrestricted.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { RestrictedComponent } from './restricted/restricted.component';



@NgModule({
  declarations: [UnrestrictedComponent, RestrictedComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
