import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersService } from '@core/services/customers.service';
import { Customer } from 'app/models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  @Input()
  customers: Customer[];

  @Output()
  select = new EventEmitter<Customer>();

  @Output()
  delete = new EventEmitter<Customer>();

  constructor() { }

  ngOnInit() {
  }

}
