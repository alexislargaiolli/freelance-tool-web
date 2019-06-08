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

  public getFacturationChartData(period$: Observable<Period>) {
    const invoices$ = this._invoiceService.getInvoiceByPeriod(period$);
    return invoices$.pipe(
      withLatestFrom(period$),
      map(([invoices, period]) => {
        const current = moment(period.start).startOf('month');
        const end = moment(period.end);
        const caSerie = [];
        const series = [];
        const tvaSerie = [];
        let amount = 0;
        let tva = 0;
        while (current.isBefore(end)) {
          const endOfMonth = moment(current).endOf('month');
          const invoicesOfTheMonth = invoices.filter(invoice =>
            moment(invoice.startDate).isBetween(current, endOfMonth)
          );
          const invoicesUntilThisMonth = invoices.filter(invoice =>
            moment(invoice.startDate).isBefore(endOfMonth)
          );
          const monthInvoiceSeries = invoicesUntilThisMonth.map(invoice =>
            ({ name: moment(invoice.startDate).format('MMMM'), value: invoice.amountDutyFree })
          );
          amount += invoicesOfTheMonth.reduce((sum, invoice) => sum + invoice.amountDutyFree, 0);
          tva += invoicesOfTheMonth.reduce((sum, invoice) => sum + invoice.tvaAmount, 0);
          caSerie.push({
            series: monthInvoiceSeries,
            name: current.format('MMMM')
          });
          // tvaSerie.push({
          //   value: tva,
          //   name: current.format('MMMM')
          // });
          series.push({

          });
          current.add(1, 'month');
        }
        return caSerie;
        return [
          {
            name: 'Chiffre d\'affaire',
            series: caSerie
          },
          // {
          //   name: 'TVA',
          //   series: tvaSerie
          // }
        ];
      })
    );
  }

}
