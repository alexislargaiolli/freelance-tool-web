import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CanActivateChild } from '@angular/router/src/interfaces';
import { User } from '@models';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { SessionService } from '../services/session.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {

    constructor(
        private _session: SessionService,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        const roles = next.data['roles'] as Array<string>;
        return this.userCanActivate(roles);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const roles = childRoute.data['roles'] as Array<string>;
        return this.userCanActivate(roles);
    }

    userCanActivate(rolesAuthorized: Array<string>): Observable<boolean> {
        return this._session.user$.pipe(
            map((user: User) => {
                return user.roles.some(r => rolesAuthorized.some(r2 => r2 === r));
            }),
            tap(authorized => {
                if (!authorized) {
                    this.router.navigate(['']);
                }
            }),
            take(1)
        );
    }
}
