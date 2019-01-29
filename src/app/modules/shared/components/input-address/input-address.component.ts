import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Address } from '@models';

@Component({
  selector: 'app-input-address',
  templateUrl: './input-address.component.html',
  styleUrls: ['./input-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputAddressComponent implements OnInit {

  @Input()
  address: Address;

  constructor() { }

  ngOnInit() {
  }

}
