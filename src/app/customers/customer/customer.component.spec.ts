import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Results } from 'src/app/core/api/results';
import { Project } from 'src/app/projects/project';
import { ProjectService } from 'src/app/projects/project.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Customer } from '../customer';

import { CustomerComponent } from './customer.component';


@Component({
  selector: 'app-project',
  template: ''
})
class ProjectStubComponent {
  @Input() project!: Project;
}

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;
  const projects = new Results<Project>();
  const project = new Project();
  project.id = '1';
  project.name = 'First project';
  projects.data.push(project);

  beforeEach(async () => {
    const projectServiceMock = jasmine.createSpyObj('ProjectService', ['getList']);

    await TestBed.configureTestingModule({
      declarations: [ CustomerComponent, ProjectStubComponent ],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        SharedModule
      ],
      providers: [
        {
          provide: ProjectService,
          useValue: projectServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;

    projectServiceSpy = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>;
    const customer = new Customer();
    customer.id = '1';
    component.customer = customer;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get projects list', () => {
    projectServiceSpy.getList.and.returnValue(of(projects));
    const expansionPanel = fixture.debugElement.query(By.css('mat-expansion-panel')).nativeElement;
    expansionPanel.dispatchEvent(new Event('afterExpand'));

    expect(component.projects).toEqual(projects);
  });

  it('should emit selected', () => {
    spyOn(component.selected, 'emit');
    projectServiceSpy.getList.and.returnValue(of(projects));

    const expansionPanel = fixture.debugElement.query(By.css('mat-expansion-panel')).nativeElement;
    expansionPanel.dispatchEvent(new Event('afterExpand'));
    fixture.detectChanges();

    const projectElement = fixture.debugElement.query(By.css('mat-list-item')).nativeElement;
    projectElement.dispatchEvent(new Event('click'));

    expect(component.selected.emit).toHaveBeenCalledWith(projects.data[0]);
  });
});
