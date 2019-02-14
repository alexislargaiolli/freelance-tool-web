import { Component, OnInit, ViewChild } from '@angular/core';
import { Invoice } from '@models';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, takeUntil } from 'rxjs/operators';
import { DestroyObservable } from 'app/common/destroy-observable';
import { BehaviorSubject } from 'rxjs';
import { InvoiceViewMode } from './invoice-view-mode.enum';
import { MatButtonToggleChange } from '@angular/material';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';

@Component({
  selector: 'app-invoice-edition',
  templateUrl: './invoice-edition.component.html',
  styleUrls: ['./invoice-edition.component.scss']
})
export class InvoiceEditionComponent extends DestroyObservable implements OnInit {

  @ViewChild(InvoiceFormComponent)
  invoiceForm: InvoiceFormComponent;

  invoice: Invoice;

  _viewMode = new BehaviorSubject<string>(InvoiceViewMode.SPLIT);

  get viewMode() { return this._viewMode.value; }

  InvoiceViewMode = InvoiceViewMode;

  constructor(private _breakpointObserver: BreakpointObserver) {
    super();
  }

  ngOnInit() {
    this._breakpointObserver.observe([
      Breakpoints.WebLandscape,
    ]).pipe(
      takeUntil(this.destroy$),
      map(result => result.matches),
    ).subscribe((isLarge) => {
      if (!isLarge && this.viewMode === InvoiceViewMode.SPLIT) {
        this._viewMode.next(InvoiceViewMode.FORM);
      }
    });
  }

  save() {
    this.invoiceForm.saveInvoice();
  }

  onFormChange(invoice: Invoice) {
    this.invoice = invoice;
  }

  changeViewMode(event: MatButtonToggleChange) {
    this._viewMode.next(event.value);
  }

}
