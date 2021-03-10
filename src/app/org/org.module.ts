import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgRoutingModule } from './org-routing.module';
import { IndexComponent } from './index/index.component';
import { StartComponent } from './start/start.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [IndexComponent, StartComponent],
  imports: [
    CommonModule,
    OrgRoutingModule,
    SharedModule
  ]
})
export class OrgModule { }
