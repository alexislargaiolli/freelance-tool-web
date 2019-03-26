import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '@models';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DestroyObservable } from 'app/common/destroy-observable';
import { takeUntil, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '@notification/services/notification.service';
import { InvoicesService } from '@core/services/invoices.service';
import * as moment from 'moment';
import { DialogsService } from '@core/services/dialog.service';
import { UserCompaniesService } from '@core/services/user-companies.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent extends DestroyObservable implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Invoice>();
  creating$: Observable<boolean>;
  displayedColumns$: Observable<string[]>;
  dateFormat$: Observable<string>;
  columns = ['title', 'startDate', 'amount', 'state', 'actions'];

  constructor(
    private _companyService: UserCompaniesService,
    private _invoicesService: InvoicesService,
    private _router: Router,
    private _notifService: NotificationService,
    private _dialogService: DialogsService,
    private _breakpointObserver: BreakpointObserver
  ) {
    super();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.creating$ = this._invoicesService.creating$;
    this._invoicesService.items$.pipe(takeUntil(this.destroy$)).subscribe(invoices => this.dataSource.data = invoices);

    const breakpoints$ = this._breakpointObserver.observe([
      Breakpoints.Handset,
    ]);

    this.dateFormat$ = breakpoints$.pipe(
      map(result => {
        if (result.matches) {
          return 'shortDate';
        }
        return 'mediumDate';
      })
    );

    this.displayedColumns$ = breakpoints$.pipe(
      map(result => {
        if (result.matches) {
          return this.columns.filter(column => column !== 'amount' && column !== 'state');
        }
        return this.columns;
      }),
    );
  }

  createInvoice() {
    const company = this._companyService.currentCompany;
    const userFacturationAddress = { ...company.facturationAddress };
    delete userFacturationAddress['id'];
    const invoice: Invoice = {
      title: 'Nouvelle facture',
      code: `${this.dataSource.data.length + 1}`,
      startDate: new Date(),
      validityDate: moment().add(1, 'M').toDate(),
      userName: company.name,
      userPhone: company.phone,
      userEmail: company.email,
      userSiret: company.siret,
      userFacturationAddress,
      customerFacturationAddress: {},
      invoiceItems: []
    };
    this._invoicesService.create(invoice).subscribe(
      () => this._notifService.success('Facture créée'),
      () => this._notifService.error('La création a échouée')
    );
  }

  deleteInvoice(invoice: Invoice) {
    this._dialogService.confirm('Confirmation', `Êtes-vous sure de vouloir supprimer la facture « ${invoice.title} » ?`)
      .subscribe((confirmed) => {
        if (confirmed) {
          this._invoicesService.delete(invoice.id).subscribe(
            () => this._notifService.removeSuccess(),
            () => this._notifService.removeError()
          );
        }
      });
  }

  selectInvoice(invoice: Invoice) {
    this._router.navigate(['invoice', invoice.id]);
  }

}
