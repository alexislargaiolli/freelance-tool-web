import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { NotificationCenterComponent } from './components/notification-center/notification-center.component';
import { NotificationComponent } from './components/notification/notification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule, MatIconModule, BrowserAnimationsModule
  ],
  declarations: [
    NotificationComponent, NotificationCenterComponent
  ],
  exports: [
    NotificationCenterComponent
  ]
})
export class NotificationModule { }
