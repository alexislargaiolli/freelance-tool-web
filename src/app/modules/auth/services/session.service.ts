import { Injectable, OnInit } from '@angular/core';
import { User } from '@models';
import { Subject } from 'rxjs';
import { map, takeUntil, filter, pairwise, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { NotificationService } from 'app/modules/notification/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _user$ = new Subject<User>();

  constructor(
    private _authService: AuthService,
    private _notificationService: NotificationService
  ) {

    this._user$.pipe(
      pairwise(),
      filter(([previous, current]) => previous == null && current != null),
    ).subscribe(([previous, current]) => this._notificationService.message(`Bonjour ${current.firstname}`));

    this._authService.authResponse$.pipe(
      map(r => r != null ? r.user : null),
    ).subscribe(u => this._user$.next(u));
  }

  get user$() { return this._user$.pipe(filter(u => u != null)); }

}
