import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartComponent } from './start/start.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OrgModule { }
