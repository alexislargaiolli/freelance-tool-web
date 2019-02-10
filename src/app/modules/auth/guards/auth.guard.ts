import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CanActivateChild, CanLoad } from '@angular/router/src/interfaces';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.checkAuthentication();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkAuthentication();
    }

    canLoad(route: Route): Observable<boolean> {
        return this.checkAuthentication();
    }

    private checkAuthentication(): Observable<boolean> {
        if (this.authService.authenticating) {
            return this.authService.authenticating$.pipe(
                filter(authenticating => authenticating === false),
                mergeMap(() => this.authService.authenticated$),
                tap((authenticated: boolean) => {
                    if (!authenticated) {
                        this.router.navigate(['/login']);
                    }
                }),
                take(1)
            );
        }

        return this.authService.authenticated$.pipe(
            map((authenticated: boolean) => {
                if (!authenticated) {
                    this.router.navigate(['/login']);
                }
                return authenticated;
            }), take(1));
    }
}
