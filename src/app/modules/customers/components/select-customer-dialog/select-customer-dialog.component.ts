import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'app/models/customer.model';
import { CustomersService } from '@core/services/customers.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-select-customer-dialog',
  templateUrl: './select-customer-dialog.component.html',
  styleUrls: ['./select-customer-dialog.component.scss']
})
export class SelectCustomerDialogComponent implements OnInit {

  loading$: Observable<boolean>;
  customers$: Observable<Customer[]>;

  constructor(
    private _customerService: CustomersService,
    public _dialogRef: MatDialogRef<SelectCustomerDialogComponent>
  ) { }

  ngOnInit() {
    this.loading$ = this._customerService.loading$;
    this.customers$ = this._customerService.items$;
  }

  select(customer: Customer) {
    this._dialogRef.close(customer);
  }

}
