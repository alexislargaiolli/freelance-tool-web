import { Component, OnInit } from '@angular/core';
import { PeriodService } from '@core/services/period.service';
import { Observable } from 'rxjs';
import { Period } from '@models';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-period-select',
  templateUrl: './period-select.component.html',
  styleUrls: ['./period-select.component.scss']
})
export class PeriodSelectComponent implements OnInit {

  periods$: Observable<Period[]>;
  currentPeriod$: Observable<Period>;

  constructor(
    private _periodService: PeriodService,
  ) { }

  ngOnInit() {
    this.periods$ = this._periodService.periods$;
    this.currentPeriod$ = this._periodService.currentPeriod$;
  }

  onSelectPeriod(event: MatSelectChange) {
    this._periodService.selectPeriod(event.value);
  }

  comparePeriod(p1: Period, p2: Period) {
    return p1.start.getFullYear() === p2.start.getFullYear();
  }

}
