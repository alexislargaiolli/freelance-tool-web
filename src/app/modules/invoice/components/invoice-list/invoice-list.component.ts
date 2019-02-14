import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '@models';
import { MatTableDataSource } from '@angular/material';
import { DestroyObservable } from 'app/common/destroy-observable';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '@notification/services/notification.service';
import { InvoicesService } from '@core/services/invoices.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent extends DestroyObservable implements OnInit {

  dataSource = new MatTableDataSource<Invoice>();
  creating$: Observable<boolean>;

  constructor(private _invoicesService: InvoicesService, private _router: Router, private _notifService: NotificationService) {
    super();
  }

  ngOnInit() {
    this.creating$ = this._invoicesService.creating$;
    this._invoicesService.items$.pipe(takeUntil(this.destroy$)).subscribe(invoices => this.dataSource.data = invoices);
  }

  createInvoice() {
    const invoice = {
      title: 'Nouvelle facture',
      code: `${this.dataSource.data.length + 1}`,
      userFacturationAddress: {},
      customerFacturationAddress: {},
      invoiceItems: []
    };
    this._invoicesService.create(invoice).subscribe(
      () => this._notifService.success('Facture créée'),
      () => this._notifService.error()
    );
  }

  selectInvoice(invoice: Invoice) {
    this._router.navigate(['invoice', invoice.id]);
  }

}
