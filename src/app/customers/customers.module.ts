import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './customer/customer.component';
import { ProjectsModule } from '../projects/projects.module';



@NgModule({
  declarations: [
    CustomerComponent
  ],
  exports: [
    CustomerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectsModule
  ]
})
export class CustomersModule { }
