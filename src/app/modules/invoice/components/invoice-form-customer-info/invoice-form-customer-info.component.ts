import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-form-customer-info',
  templateUrl: './invoice-form-customer-info.component.html',
  styleUrls: ['./invoice-form-customer-info.component.scss'],
})
export class InvoiceFormCustomerInfoComponent implements OnInit {

  @Input()
  parentFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get customerSiret() { return this.parentFormGroup.get('customerSiret') as FormControl; }
  get customerEmail() { return this.parentFormGroup.get('customerEmail') as FormControl; }
  get customerPhone() { return this.parentFormGroup.get('customerPhone') as FormControl; }
  get customerFacturationAddress() { return this.parentFormGroup.get('customerFacturationAddress') as FormGroup; }
}
