import { Component, OnInit } from '@angular/core';
import { ChartService } from '@core/services/chart.service';
import { InvoicesService } from '@core/services/invoices.service';
import { PeriodService } from '@core/services/period.service';
import { Observable } from 'rxjs';
import { TurnOverInfo } from 'app/models/turnover-info.model';
import { DashboardService } from '@core/services/dashboard.service';
import { DashboardSummary } from 'app/models/dashboard-summary.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  invoiceChartData$: Observable<any>;
  summaryChart$: Observable<any>;
  referenceLine = [{
    name: 'CA max',
    value: 70000
  }];
  summary$: Observable<DashboardSummary>;

  constructor(
    private _periodService: PeriodService,
    private _chartService: ChartService,
    private _dashboardService: DashboardService
  ) { }

  ngOnInit() {
    const currentPeriod$ = this._periodService.currentPeriod$;
    this.invoiceChartData$ = this._chartService.getFacturationChartData(currentPeriod$);
    this.summaryChart$ = this._chartService.getSummaryChart(currentPeriod$);
    this.summary$ = this._dashboardService.summary(currentPeriod$);
  }

}
