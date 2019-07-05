import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { layoutAnim } from './layout.animation';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [layoutAnim]
})
export class LayoutComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  sideNavMode$: Observable<string>;
  mobileBreakpoint$: Observable<boolean>;
  isMobile: boolean;
  menuMobileState = false;

  constructor(
    private _breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.mobileBreakpoint$ = this._breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
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

  openMobileMenu() {
    this.menuMobileState = true;
  }

  closeMobileMenu() {
    this.menuMobileState = false;
  }

  close(reason: string) {
    // this.sidenav.close();
  }

}
