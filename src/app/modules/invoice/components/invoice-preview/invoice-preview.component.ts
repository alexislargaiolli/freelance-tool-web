import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from '@models';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss'],
})
export class InvoicePreviewComponent implements OnInit {

  @Input()
  invoice: Invoice;

  constructor() { }

  ngOnInit() {
  }

}
