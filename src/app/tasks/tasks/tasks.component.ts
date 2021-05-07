import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/customers/customer';
import { Project } from 'src/app/projects/project';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  selectedCustomer: Customer|null = null;
  selectedProject: Project|null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(item: Project|Customer): void {
    if (item.type === 'Project') {
      this.selectedProject = item;
    } else if (item.type === 'Customer') {
      this.selectedCustomer = item;
      this.selectedProject = null;
    }
  }

}
