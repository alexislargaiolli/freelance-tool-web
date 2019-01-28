import { Component, OnInit } from '@angular/core';
import { Notification } from '../../models/notification.model';
import { NotificationService } from '../../services/notification.service';
import { notifAnim } from './notification-center.animation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss'],
  animations: [
    notifAnim
  ]
})
export class NotificationCenterComponent implements OnInit {

  public defaultLifeTime = 5000;

  public notifications$: Observable<Notification[]>;

  constructor(private _notifService: NotificationService) {
  }

  ngOnInit() {
    this.notifications$ = this._notifService.notifications$;
  }

  public removeNotification(notification: Notification) {
    this._notifService.remove(notification);
  }

}
