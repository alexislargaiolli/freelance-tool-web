import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { InvoicesService } from '@core/services/invoices.service';
import { Invoice } from '@models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-select-invoice-dialog',
  templateUrl: './select-invoice-dialog.component.html',
  styleUrls: ['./select-invoice-dialog.component.scss']
})
export class SelectInvoiceDialogComponent implements OnInit {

  loading$: Observable<boolean>;
  invoices$: Observable<Invoice[]>;

  constructor(
    private _invoiceService: InvoicesService,
    private _dialogRef: MatDialogRef<SelectInvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private _options: { invoicesToExclude: Invoice[] }
  ) { }

  ngOnInit() {
    this._invoiceService.load().subscribe();
    this.loading$ = this._invoiceService.loading$;
    this.invoices$ = this._invoiceService.items$.pipe(map(invoices => {
      if (this._options && this._options.invoicesToExclude != null) {
        return invoices.filter(invoice => !this._options.invoicesToExclude.find(invoiceToExclude => invoiceToExclude.id === invoice.id));
      }
      return invoices;
    }));
  }

  selectInvoice(invoice: Invoice) {
    this._dialogRef.close(invoice);
  }

}
