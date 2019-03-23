import { Component, OnInit } from '@angular/core';
import { PeriodService } from '@core/services/period.service';
import { InvoicesService } from '@core/services/invoices.service';
import { map, first, filter } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Period } from '@models';
import { ChartService } from '@core/services/chart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private _currentPeriod$ = new BehaviorSubject<Period>(null);
  periods$: Observable<Period[]>;
  invoiceChartData$: Observable<any>;

  constructor(
    private _invociesService: InvoicesService,
    private _periodService: PeriodService,
    private _chartService: ChartService
  ) { }

  ngOnInit() {
    this.periods$ = this._periodService.getPeriods();
    this.periods$.pipe(first()).subscribe(periods => this.currentPeriod = periods[0]);
    const currentPeriod$ = this._currentPeriod$.pipe(filter(period => period != null));
    this.invoiceChartData$ = this._chartService.getFacturationChartData(currentPeriod$);
  }

  comparePeriod(p1: Period, p2: Period) {
    return p1.start.getFullYear() === p2.start.getFullYear();
  }

  get currentPeriod() { return this._currentPeriod$.value; }
  set currentPeriod(period: Period) { this._currentPeriod$.next(period); }

}
