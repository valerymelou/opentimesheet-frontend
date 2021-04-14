import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeTrackRoutingModule } from './time-track-routing.module';
import { FillComponent } from './fill/fill.component';


@NgModule({
  declarations: [FillComponent],
  imports: [
    CommonModule,
    TimeTrackRoutingModule
  ]
})
export class TimeTrackModule { }
