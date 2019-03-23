import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { InvoicesService } from './invoices.service';
import { Period } from '@models';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(
    private _invociesService: InvoicesService
  ) { }

  getPeriodsFrom(from$: Observable<Date>): Observable<Period[]> {
    return from$.pipe(
      map(from => {
        const today = moment();
        const startDate = moment(from).startOf('year');
        const periods: Period[] = [{ start: startDate.toDate(), end: moment(startDate).endOf('year').toDate() }];

        while (startDate.add(1, 'year').isBefore(today)) {
          periods.push({ start: startDate.toDate(), end: moment(startDate).endOf('year').toDate() });
        }
        return periods;
      }),
      startWith([{
        start: moment().startOf('year').toDate(),
        end: moment().endOf('year').toDate()
      }])
    );
  }

  getPeriods(): Observable<Period[]> {
    const olderInvoiceDate = this._invociesService.olderInvoice().pipe(map(olderInvoice => olderInvoice.startDate));
    return this.getPeriodsFrom(olderInvoiceDate);
  }

}
