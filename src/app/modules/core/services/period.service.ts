import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { InvoicesService } from './invoices.service';
import { Period } from '@models';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  private _currentPeriod$ = new BehaviorSubject<Period>(null);
  private _periods$ = new BehaviorSubject<Period[]>([]);

  constructor(
    private _invociesService: InvoicesService
  ) {
    this.getPeriods().subscribe(periods => {
      if (this._currentPeriod$.value == null) {
        this._currentPeriod$.next(periods[0]);
      }
      this._periods$.next(periods);
    });
  }

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

  selectPeriod(period: Period) {
    this._currentPeriod$.next(period);
  }

  get currentPeriod$(): Observable<Period> { return this._currentPeriod$.pipe(filter(period => period != null)); }
  get currentPeriod(): Period { return this._currentPeriod$.value; }
  get periods$(): Observable<Period[]> { return this._periods$; }
}
