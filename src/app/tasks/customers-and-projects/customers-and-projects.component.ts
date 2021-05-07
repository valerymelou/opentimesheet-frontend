import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Results } from 'src/app/core/api/results';
import { CustomerService } from 'src/app/customers/customer.service';
import { Project } from 'src/app/projects/project';
import { Customer } from '../../customers/customer';

@Component({
  selector: 'app-customers-and-projects',
  templateUrl: './customers-and-projects.component.html',
  styleUrls: ['./customers-and-projects.component.scss']
})
export class CustomersAndProjectsComponent implements OnInit {
  @Output() selected: EventEmitter<Project|Customer> = new EventEmitter<Project|Customer>();
  customers: Results<Customer> = new Results<Customer>();

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getList().subscribe((results: Results<Customer>) => {
      this.customers = results;
    });
  }

  onSelected(item: Project|Customer): void {
    this.selected.emit(item);
  }
}
