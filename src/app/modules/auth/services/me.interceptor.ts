import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable()
export class MeInterceptor implements HttpInterceptor {

    constructor(
        private _sessionService: SessionService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.startsWith(`${environment.api_endpoint}/me`) || this._sessionService.user == null) {
            return next.handle(req);
        }
        // Clone the request to change url
        req = req.clone({
            url: req.url.replace('/me', `/users/${this._sessionService.user.id}`)
        });
        // Pass on the cloned request instead of the original request.
        return next.handle(req);
    }
}
