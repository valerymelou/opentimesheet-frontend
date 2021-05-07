import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Results } from 'src/app/core/api/results';
import { Project } from 'src/app/projects/project';
import { ProjectService } from 'src/app/projects/project.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  @Input() customer!: Customer;
  @Output() selected: EventEmitter<Project> = new EventEmitter<Project>();
  projects: Results<Project> = new Results<Project>();

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  getProjects(): void {
    const filters = {
      'filter[customer.id]': `${this.customer.id}`
    };

    this.projectService.getList(filters).subscribe((results: Results<Project>) => {
      this.projects = results;
    });
  }

  selectProject(event: any, project: Project): void {
    event.stopPropagation();
    this.selected.emit(project);
  }
}
