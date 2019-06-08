import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { mobileNavAnim } from './mobile-navigation-menu.animations';

@Component({
  selector: 'app-mobile-navigation-menu',
  templateUrl: './mobile-navigation-menu.component.html',
  styleUrls: ['./mobile-navigation-menu.component.scss'],
  animations: [
    mobileNavAnim
  ]
})
export class MobileNavigationMenuComponent implements OnInit {

  @HostBinding('@mobileNavAnim')
  opened = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.opened = !this.opened;
  }

  @HostListener('swipeleft')
  open() {
    this.opened = true;
  }

  @HostListener('swiperight')
  close() {
    this.opened = false;
  }

}
