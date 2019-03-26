import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TaxReturn } from '@models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tax-return-list',
  templateUrl: './tax-return-list.component.html',
  styleUrls: ['./tax-return-list.component.scss']
})
export class TaxReturnListComponent implements OnInit {

  @Input()
  taxReturns: TaxReturn[];

  @Output()
  select = new EventEmitter<TaxReturn>();

  @Output()
  delete = new EventEmitter<TaxReturn>();

  displayedColumns$: Observable<string[]>;
  dateFormat$: Observable<string>;

  columns = ['date', 'periodStartDate', 'periodEndDate', 'amount', 'actions'];

  constructor(private _breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
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
          return this.columns.filter(column => column !== 'date');
        }
        return this.columns;
      }),
    );


  }

}
