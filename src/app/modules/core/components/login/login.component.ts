import { Component, OnInit, HostBinding, OnDestroy, HostListener } from '@angular/core';
import { loginAnim } from './login.animation';
import { DestroyObservable } from 'app/common/destroy-observable';
import { of, Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { takeUntil, map, mergeMap, filter, delay, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    loginAnim
  ]
})
export class LoginComponent extends DestroyObservable implements OnInit, OnDestroy {

  private static readonly STATE_LOGGED_IN = 'loggedIn';
  private static readonly STATE_NOT_LOGGED_IN = 'notLoggedIn';

  @HostBinding('@loginAnim')
  animation = LoginComponent.STATE_NOT_LOGGED_IN;

  authenticating$: Observable<boolean>;

  authenticated$: Observable<boolean>;

  // Emit the current animation when and animation ends
  animationEnds$ = new Subject<string>();

  groups: [{ label: string, users: [{ username: string, password: string }] }];

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.authenticating$ = this._authService.authenticating$;
    this.authenticated$ = this._authService.authenticated$;
    // Navigate to the dashboard when the user authenticates
    this._authService.authenticated$
      .pipe(
        takeUntil(this.destroy$),
        // Set the animation based on authenticated value
        map(authenticated => {
          if (authenticated) {
            this.animation = LoginComponent.STATE_LOGGED_IN;
          } else {
            this.animation = LoginComponent.STATE_NOT_LOGGED_IN;
          }
        }),
        // Merge with the animation ends observable
        mergeMap(() => this.animationEnds$),
        // If the ended animation is logged in animation
        filter((anim) => anim === LoginComponent.STATE_LOGGED_IN),
        // Wait 1s to show success message
        delay(1000),
        // Navigate to dashboard
        tap(() => this._router.navigate(['/dashboard']))
      )
      .subscribe();
  }

  login(loginForm: NgForm) {
    if (loginForm.valid) {
      const username = loginForm.controls['username'].value;
      const password = loginForm.controls['password'].value;
      this._authService.login(username, password).subscribe();
    }
  }

  @HostListener('@loginAnim.done')
  authenticatedAnimationEnds() {
    this.animationEnds$.next(this.animation);
  }

}
