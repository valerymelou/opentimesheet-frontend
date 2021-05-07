import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import { SharedModule } from '../shared/shared.module';
import { CustomersAndProjectsComponent } from './customers-and-projects/customers-and-projects.component';
import { CustomersModule } from '../customers/customers.module';


@NgModule({
  declarations: [TasksComponent, CustomersAndProjectsComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    CustomersModule,
    SharedModule,
  ]
})
export class TasksModule { }
