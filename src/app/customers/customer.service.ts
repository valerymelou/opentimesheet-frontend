import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonApiService } from '../core/api/json-api.service';
import { Customer } from '../customers/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends JsonApiService<Customer> {

  constructor(protected http: HttpClient) {
    super(http, Customer, '/customers/');
  }
}
