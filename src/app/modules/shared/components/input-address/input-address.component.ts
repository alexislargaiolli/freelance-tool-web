import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-address',
  templateUrl: './input-address.component.html',
  styleUrls: ['./input-address.component.scss'],
})
export class InputAddressComponent implements OnInit {

  @Input()
  parentFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get address1() { return this.parentFormGroup.get('address1') as FormControl; }
  get address2() { return this.parentFormGroup.get('address2') as FormControl; }
  get address3() { return this.parentFormGroup.get('address3') as FormControl; }
  get city() { return this.parentFormGroup.get('city') as FormControl; }
  get postalCode() { return this.parentFormGroup.get('postalCode') as FormControl; }

}
