import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-invoice-item-form',
  templateUrl: './invoice-item-form.component.html',
  styleUrls: ['./invoice-item-form.component.scss']
})
export class InvoiceItemFormComponent implements OnInit {

  @Input()
  formArray: FormArray;

  @Output()
  create = new EventEmitter();

  @Output()
  delete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

}
