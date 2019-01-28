import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivateChild, CanLoad } from '@angular/router/src/interfaces';
import { map, take } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';

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
        return this.authService.authenticated$.pipe(
            map((authenticated: boolean) => {
                if (!authenticated) {
                    this.router.navigate(['/login']);
                }
                return authenticated;
            }), take(1));
    }
}
