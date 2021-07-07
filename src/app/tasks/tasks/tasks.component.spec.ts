import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { Customer } from 'src/app/customers/customer';
import { Project } from 'src/app/projects/project';
import { SharedModule } from 'src/app/shared/shared.module';

import { TasksComponent } from './tasks.component';

@Component({
  selector: 'app-customers-and-projects',
  template: ''
})
class CustomersAndProjectsStubComponent {}



describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TasksComponent,
        CustomersAndProjectsStubComponent
      ],
      imports: [
        SharedModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selected project or customer', () => {
    const itemsElement = fixture.debugElement.query(By.css('app-customers-and-projects'));
    const customer = new Customer();
    const project = new Project();

    itemsElement.triggerEventHandler('selected', {});
    expect(component.selectedCustomer).toBeNull();
    expect(component.selectedProject).toBeNull();

    itemsElement.triggerEventHandler('selected', customer);
    expect(component.selectedCustomer).toEqual(customer);
    expect(component.selectedProject).toBeNull();

    itemsElement.triggerEventHandler('selected', project);
    expect(component.selectedCustomer).toEqual(customer);
    expect(component.selectedProject).toEqual(project);
  });
});
