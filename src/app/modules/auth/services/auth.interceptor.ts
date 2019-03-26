import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from '@notification/services/notification.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';




@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private _authService: AuthService,
        private _notification: NotificationService,
        private _router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        const authToken = this._authService.token;
        if (!authToken) {
            return next.handle(req);
        }
        // Clone the request to add the new header.
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`
            }
        });
        // Pass on the cloned request instead of the original request.
        return next.handle(req).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // do stuff with response if you want
                    }
                },
                (err: HttpErrorResponse) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            this._router.navigateByUrl('/login');
                            this._authService.logoutSuccess();
                            this._notification.error(`Vous n'êtes pas authentifié.`);
                        } else if (err.status === 403) {
                            this._notification.error(`Vous n'êtes pas authorisé à faire cela.`);
                            this._router.navigateByUrl('/login');
                            this._authService.logoutSuccess();
                        }
                    }
                }
            ));
    }
}
