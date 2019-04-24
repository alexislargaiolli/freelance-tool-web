import { Component, OnInit } from '@angular/core';
import { ChartService } from '@core/services/chart.service';
import { InvoicesService } from '@core/services/invoices.service';
import { PeriodService } from '@core/services/period.service';
import { Observable } from 'rxjs';

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

  constructor(
    private _invociesService: InvoicesService,
    private _periodService: PeriodService,
    private _chartService: ChartService
  ) { }

  ngOnInit() {
    const currentPeriod$ = this._periodService.currentPeriod$;
    this.invoiceChartData$ = this._chartService.getFacturationChartData(currentPeriod$);
    this.summaryChart$ = this._chartService.getSummaryChart(currentPeriod$);
  }

}
