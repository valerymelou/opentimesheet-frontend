import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { TimeTrackRoutingModule } from './time-track-routing.module';
import { FillComponent } from './fill/fill.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [FillComponent],
  imports: [
    TimeTrackRoutingModule,
    SharedModule
  ],
})
export class TimeTrackModule { }
