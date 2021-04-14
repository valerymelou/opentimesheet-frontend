import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FillComponent } from './fill/fill.component';

const routes: Routes = [
  {
    path: 'fill',
    component: FillComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeTrackRoutingModule { }
