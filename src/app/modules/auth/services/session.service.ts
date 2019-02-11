import { Injectable } from '@angular/core';
import { User } from '@models';
import { NotificationService } from 'app/modules/notification/services/notification.service';
import { BehaviorSubject } from 'rxjs';
import { filter, map, pairwise } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _user$ = new BehaviorSubject<User>(null);

  constructor(
    private _authService: AuthService,
    private _notificationService: NotificationService
  ) {
  }

  initialize() {
    this._user$.pipe(
      pairwise(),
      filter(([previous, current]) => previous == null && current != null),
    ).subscribe(([previous, current]) => this._notificationService.message(`Bonjour ${current.firstname}`));

    this._authService.authResponse$.pipe(
      map(r => r != null ? r.user : null),
    ).subscribe(u => this._user$.next(u));
  }

  get user$() { return this._user$.pipe(filter(u => u != null)); }

  get user() { return this._user$.value; }

}
