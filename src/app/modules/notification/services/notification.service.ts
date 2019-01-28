import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../models/notification.model';
import { NotificationType } from '../models/notification-type.enum';
import { NotificationIcon } from '../models/notification-icon.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notifications$ = new BehaviorSubject<Notification[]>([]);

  constructor() { }

  get notifications$(): Observable<Notification[]> { return this._notifications$; }

  public add(notif: Notification) {
    const notifs = [...this._notifications$.value, notif];
    this._notifications$.next(notifs);
  }

  public remove(notif: Notification) {
    const notifs = this._notifications$.value.filter(n => n.id !== notif.id);
    this._notifications$.next(notifs);
  }

  public saveSuccess(message: string) {
    return this.add(new Notification(message, NotificationType.SUCCESS, NotificationIcon.SAVE));
  }

  public saveError(message: string) {
    return this.add(new Notification(message, NotificationType.ERROR, NotificationIcon.SAVE));
  }

  public removeSuccess(message: string) {
    return this.add(new Notification(message, NotificationType.SUCCESS, NotificationIcon.DELETE));
  }

  public removeError(message: string) {
    return this.add(new Notification(message, NotificationType.ERROR, NotificationIcon.DELETE));
  }

  public message(message: string) {
    return this.add(new Notification(message));
  }

  public info(message: string) {
    return this.add(new Notification(message, NotificationType.INFO, NotificationIcon.INFO));
  }

  public warn(message: string) {
    return this.add(new Notification(message, NotificationType.WARNING, NotificationIcon.WARNING));
  }

  public success(message: string) {
    return this.add(new Notification(message, NotificationType.SUCCESS, NotificationIcon.SUCCESS));
  }

  public error(message: string) {
    return this.add(new Notification(message, NotificationType.ERROR, NotificationIcon.ERROR));
  }

}
