import { Injectable } from '@angular/core';
import { InvoicesService } from './invoices.service';
import { Period, listOfMonth } from '@models';
import { map, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private _invoiceService: InvoicesService) { }

  public getSummaryChart(period$: Observable<Period>) {
    const invoices$ = this._invoiceService.getInvoiceByPeriod(period$);
    return invoices$.pipe(
      withLatestFrom(period$),
      map(([invoices, period]) => {
        const totalTurnOver = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
        const turnOverDutyFree = invoices.reduce((sum, invoice) => sum + invoice.amountDutyFree, 0);
        const totalTVA = invoices.reduce((sum, invoice) => sum + invoice.tvaAmount, 0);
        const totalPayment = invoices.filter(invoice => invoice.paid).reduce((sum, invoice) => sum + invoice.amount, 0);
        return [
          {
            name: 'Chiffre d\'affaire',
            value: totalTurnOver
          },
          {
            name: 'TVA collectée',
            value: totalTVA
          },
          {
            name: 'Chiffre d\'affaire HT',
            value: turnOverDutyFree
          },
          {
            name: 'Total paiement reçu',
            value: totalPayment
          }
        ];
      })
    );
  }

  public getFacturationChartData(period$: Observable<Period>) {
    const invoices$ = this._invoiceService.getInvoiceByPeriod(period$);
    return invoices$.pipe(
      withLatestFrom(period$),
      map(([invoices, period]) => {
        const current = moment(period.start).startOf('month');
        const end = moment(period.end);
        const caSerie = [];
        const tvaSerie = [];
        let amount = 0;
        let tva = 0;
        while (current.isBefore(end)) {
          const endOfMonth = moment(current).endOf('month');
          const invoicesOfTheMonth = invoices.filter(invoice =>
            moment(invoice.startDate).isBetween(current, endOfMonth)
          );
          amount += invoicesOfTheMonth.reduce((sum, invoice) => sum + invoice.amountDutyFree, 0);
          tva += invoicesOfTheMonth.reduce((sum, invoice) => sum + invoice.tvaAmount, 0);
          caSerie.push({
            value: amount,
            name: current.format('MMMM')
          });
          tvaSerie.push({
            value: tva,
            name: current.format('MMMM')
          });
          current.add(1, 'month');
        }
        return [
          {
            name: 'Chiffre d\'affaire',
            series: caSerie
          },
          {
            name: 'TVA',
            series: tvaSerie
          }
        ];
      })
    );
  }

}
