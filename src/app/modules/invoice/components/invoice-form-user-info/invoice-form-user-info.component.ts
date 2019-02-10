import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-invoice-form-user-info',
  templateUrl: './invoice-form-user-info.component.html',
  styleUrls: ['./invoice-form-user-info.component.scss'],
})
export class InvoiceFormUserInfoComponent implements OnInit {

  @Input()
  parentFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get userSiret() { return this.parentFormGroup.get('userSiret') as FormControl; }
  get userEmail() { return this.parentFormGroup.get('userEmail') as FormControl; }
  get userPhone() { return this.parentFormGroup.get('userPhone') as FormControl; }
  get userFacturationAddress() { return this.parentFormGroup.get('userFacturationAddress') as FormGroup; }


}
