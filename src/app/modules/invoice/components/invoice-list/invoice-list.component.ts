import { Component, OnInit } from '@angular/core';
import { UserInvoicesService } from '@core/services/user-invoices.service';
import { Observable } from 'rxjs';
import { Invoice } from '@models';
import { MatTableDataSource } from '@angular/material';
import { DestroyObservable } from 'app/common/destroy-observable';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent extends DestroyObservable implements OnInit {

  dataSource = new MatTableDataSource<Invoice>();
  creating$: Observable<boolean>;

  constructor(private _invoicesService: UserInvoicesService, private _router: Router) {
    super();
  }

  ngOnInit() {
    this.creating$ = this._invoicesService.creating$;
    this._invoicesService.items$.pipe(takeUntil(this.destroy$)).subscribe(invoices => this.dataSource.data = invoices);
  }

  createInvoice() {
    this._invoicesService.create({ title: 'Nouvelle facture' }).subscribe();
  }

  selectInvoice(invoice: Invoice) {
    this._router.navigate(['invoice', invoice.id]);
  }

}
