import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project/project.component';



@NgModule({
  declarations: [ProjectComponent],
  exports: [ProjectComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProjectsModule { }
