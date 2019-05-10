import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentCompanyInterceptor } from '@core/interceptors/current-company.interceptor';
import { Invoice, Period } from '@models';
import { APIModelRepository } from './api-model.repository';
import { map, filter } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService extends APIModelRepository<Invoice> {

  constructor(protected _httpClient: HttpClient) {
    super(_httpClient, `/${CurrentCompanyInterceptor.KEYWORD}/invoices`);
  }

  invoicesByPeriod(period$: Observable<Period>) {
    return combineLatest(this.items$, period$).pipe(
      map(([invoices, period]) => invoices.filter(invoice => moment(invoice.startDate).isBetween(period.start, period.end)))
    );
  }

  load() {
    return super.load(`${this._url}?join=userFacturationAddress&join=customerFacturationAddress`);
  }

  loadOne(id: number) {
    return super.loadOne(id, `${this._url}/${id}?join=userFacturationAddress&join=customerFacturationAddress`);
  }

  olderInvoice(): Observable<Invoice> {
    return this.items$.pipe(
      filter(invoices => invoices.length > 0),
      map(invoices => {
        return invoices.reduce((olderInvoice, invoice) => {
          if (olderInvoice == null) {
            return invoice;
          }
          return new Date(invoice.startDate).getTime() < new Date(olderInvoice.startDate).getTime() ? invoice : olderInvoice;
        }, null);
      })
    );
  }

  generateInvoiceCode(date: Date, invoiceIdToIgnore: number) {
    const momentDate = moment(date);
    const invoicesOfSameDay = this.items.filter(invoice => {
      if (invoiceIdToIgnore != null && invoiceIdToIgnore === invoice.id) {
        return false;
      }
      return momentDate.isSame(moment(invoice.startDate), 'day');
    });

    return `${momentDate.format('YY-MM-DD')}-${invoicesOfSameDay.length}`;
  }

  getInvoiceByPeriod(period$: Observable<Period>) {
    return combineLatest(this.items$, period$, (invoices, period) => {
      return invoices.filter(invoice => moment(invoice.startDate).isBetween(period.start, period.end));
    });
  }

}
