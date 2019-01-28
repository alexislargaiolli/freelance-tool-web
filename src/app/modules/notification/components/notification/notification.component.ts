import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Notification } from '../../models/notification.model';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  @HostBinding('class') classes = 'mat-elevation-z6';

  @Input()
  public notification: Notification;

  @Input()
  private lifetime = 5000;

  @Output()
  public lifetimeOver: EventEmitter<Notification>;

  private timerSubscription$: Subscription;


  constructor() {
    this.lifetimeOver = new EventEmitter<Notification>();
  }

  ngOnInit() {
    this.timerSubscription$ = timer(this.lifetime, this.lifetime).subscribe(t => {
      this.lifetimeOver.emit(this.notification);
    });
  }

  close() {
    this.lifetimeOver.emit(this.notification);
  }

  ngOnDestroy() {
    this.timerSubscription$.unsubscribe();
  }

}
