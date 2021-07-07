import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Results } from 'src/app/core/api/results';
import { Customer } from 'src/app/customers/customer';
import { CustomerService } from 'src/app/customers/customer.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { CustomersAndProjectsComponent } from './customers-and-projects.component';


@Component({
  selector: 'app-customer',
  template: ''
})
class CustomerStubComponent {
  @Input() customer!: Customer;
}

describe('CustomersAndProjectsComponent', () => {
  let component: CustomersAndProjectsComponent;
  let fixture: ComponentFixture<CustomersAndProjectsComponent>;
  let customerServiceSpy: jasmine.SpyObj<CustomerService>;
  const customers = new Results<Customer>();
  const customer = new Customer();
  customer.id = '1';
  customer.name = 'First customer';
  customers.data.push(customer);

  beforeEach(async () => {
    const customerServiceMock = jasmine.createSpyObj('CustomerService', ['getList']);

    await TestBed.configureTestingModule({
      declarations: [
        CustomersAndProjectsComponent,
        CustomerStubComponent
      ],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: CustomerService,
          useValue: customerServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersAndProjectsComponent);
    component = fixture.componentInstance;

    customerServiceSpy = TestBed.inject(CustomerService) as jasmine.SpyObj<CustomerService>;
    customerServiceSpy.getList.and.returnValue(of(customers));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected', () => {
    spyOn(component.selected, 'emit');
    const customerElement = fixture.debugElement.query(By.css('app-customer')).nativeElement;
    customerElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.selected.emit).toHaveBeenCalledWith(customers.data[0]);
  });
});
