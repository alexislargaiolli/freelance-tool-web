import { Component, OnInit, ViewChild } from '@angular/core';
import { Invoice } from '@models';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, takeUntil, debounceTime, filter, delay } from 'rxjs/operators';
import { DestroyObservable } from 'app/common/destroy-observable';
import { BehaviorSubject, Observable, fromEvent, merge } from 'rxjs';
import { InvoiceViewMode } from './invoice-view-mode.enum';
import { MatButtonToggleChange } from '@angular/material';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import html2pdf from 'html2pdf.js';
import * as moment from 'moment';
import { InvoicePreviewComponent } from '../invoice-preview/invoice-preview.component';

@Component({
  selector: 'app-invoice-edition',
  templateUrl: './invoice-edition.component.html',
  styleUrls: ['./invoice-edition.component.scss']
})
export class InvoiceEditionComponent extends DestroyObservable implements OnInit {

  @ViewChild(InvoiceFormComponent)
  invoiceForm: InvoiceFormComponent;

  @ViewChild(InvoicePreviewComponent)
  invoicePreview: InvoicePreviewComponent;

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
      if (isLarge) {
        this._viewMode.next(InvoiceViewMode.SPLIT);
      } else {
        this.scalePreview();
        if (this.viewMode === InvoiceViewMode.SPLIT) {
          this._viewMode.next(InvoiceViewMode.FORM);
        }
      }
    });
    const windowResize$ = fromEvent(window, 'resize').pipe(debounceTime(300));
    const viewModeChanged$ = this._viewMode.pipe(
      filter(mode => mode === InvoiceViewMode.SPLIT || mode === InvoiceViewMode.VIEW),
      delay(10)
    );
    merge(windowResize$, viewModeChanged$).pipe(takeUntil(this.destroy$))
      .subscribe(() => this.scalePreview());
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

  exportToPDF() {
    const element = document.querySelector('app-invoice-preview');
    html2pdf(element, {
      margin: 0,
      filename: this.generateFileName(),
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    });
  }

  scalePreview() {
    const wrapper = document.querySelector('.preview-wrapper');
    if (wrapper != null) {
      const form = document.querySelector('app-invoice-form');
      const content = document.querySelector('.page-container');
      let expectedWidth = content.getBoundingClientRect().width;
      if (form) {
        const spacer = document.querySelector('.spacer');
        expectedWidth -= form.getBoundingClientRect().width + spacer.getBoundingClientRect().width;
      }
      const currentWith = 800;
      let scale = Math.round(expectedWidth * 100 / currentWith) / 100;
      scale = Math.min(scale, 1);
      wrapper.setAttribute('style', `transform: scale(${scale})`);
    }
  }

  public generateFileName() {
    const client = this.invoice.customerName ? ' - ' + this.invoice.customerName : '';
    const username = this.invoice.userName ? ' - ' + this.invoice.userName : '';
    const date = this.invoice.createdDate ? moment(this.invoice.createdDate).format(' - DD-MM-YY') : moment().format(' - DD-MM-YY');
    return `Facture${username}${client}${date}.pdf`;
  }

}
