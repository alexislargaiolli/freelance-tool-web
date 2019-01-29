import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, tap, pairwise, filter } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { UserCompanyService } from '@core/services/user-company.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  sideNavMode$: Observable<string>;
  mobileBreakpoint$: Observable<boolean>;
  isMobile: boolean;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    // Inject invoke contructor and trigger loads
    private _userCompanyService: UserCompanyService
  ) { }

  ngOnInit() {
    this.mobileBreakpoint$ = this._breakpointObserver.observe([
      Breakpoints.Handset,
    ]).pipe(
      map(result => result.matches),
    );
    this.sideNavMode$ = this.mobileBreakpoint$.pipe(
      map(isMobile => isMobile ? 'over' : 'side')
    );
    this.mobileBreakpoint$.subscribe((isMobile) => {
      if (!isMobile) {
        this.sidenav.open();
      } else {
        this.sidenav.close();
      }
    });

  }

  close(reason: string) {
    // this.sidenav.close();
  }

}
