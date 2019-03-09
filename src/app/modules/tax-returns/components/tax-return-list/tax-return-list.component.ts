import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TaxReturn } from '@models';

@Component({
  selector: 'app-tax-return-list',
  templateUrl: './tax-return-list.component.html',
  styleUrls: ['./tax-return-list.component.scss']
})
export class TaxReturnListComponent implements OnInit {

  @Input()
  taxReturns: TaxReturn[];

  @Output()
  select = new EventEmitter<TaxReturn>();

  @Output()
  delete = new EventEmitter<TaxReturn>();

  constructor() { }

  ngOnInit() {
  }

}
