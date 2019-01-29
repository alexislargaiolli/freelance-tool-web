
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { NotificationService } from 'app/modules/notification/services/notification.service';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { AuthResponse } from '../models/auth.response.model';

/**
 * Service that handle authentication process methods.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public static readonly STORE_KEY = 'flt-session';

    private _authResponse$ = new BehaviorSubject<AuthResponse>(null);
    private _authenticating$ = new Subject<boolean>();

    constructor(private _http: HttpClient, private _notificationService: NotificationService) { }

    /**
     * Basic credentials authentication
     * @param username user username
     * @param password user password
     */
    public login(username: string, password: string): Observable<AuthResponse> {
        this._authenticating$.next(true);
        const url = `${environment.api_endpoint}${environment.login_endpoint}`;
        return this._http.post<AuthResponse>(url, { username, password }).pipe(
            tap(response => this.loginSuccess(response)),
            catchError((error: HttpErrorResponse) => {
                let message = 'Une erreur est survenue.';
                if (error.status === 401) {
                    message = 'Identifiant ou mot de passe incorrect';
                }
                this._notificationService.error(message);
                return throwError(message);
            }),
            finalize(() => this._authenticating$.next(false))
        );
    }

    public loginSuccess(authResponse: AuthResponse) {
        this._authResponse$.next(authResponse);
        this.storeToken(authResponse);
    }

    public logout() {
        const url = `${environment.api_endpoint}/${environment.logout_endpoint}`;
        return this._http.get(url).pipe(
            tap(() => this.logoutSuccess()),
        );
    }

    public logoutSuccess() {
        this._authResponse$.next(null);
        this.deleteStoredToken();
    }

    public register(firstname: string, lastname: string, email: string, username: string, password: string) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        const url = `${environment.api_endpoint}/${environment.register_endpoint}`;
        const data = { firstname, lastname, email, username, password };
        return this._http.post<AuthResponse>(url, data, httpOptions);
    }

    public storeToken(authResponse: AuthResponse) {
        localStorage.setItem(AuthService.STORE_KEY, btoa(JSON.stringify(authResponse)));
    }

    public readToken(): AuthResponse {
        const encryptedSession = localStorage.getItem(AuthService.STORE_KEY);
        if (encryptedSession) {
            const session = JSON.parse(atob(encryptedSession));
            if (session.token != null && session.user != null) {
                return session;
            }
        }
        return null;
    }

    public deleteStoredToken() {
        localStorage.removeItem(AuthService.STORE_KEY);
    }

    public checkAutoLogin() {
        const response = this.readToken();
        if (response != null) {
            this.loginSuccess(response);
        }
    }

    get authResponse$(): Observable<AuthResponse> { return this._authResponse$; }

    get token$(): Observable<string> {
        return this._authResponse$.pipe(map(r => r != null ? r.token : null));
    }

    get token(): string {
        return this._authResponse$.value != null ? this._authResponse$.value.token : null;
    }

    get authenticated$(): Observable<boolean> { return this.token$.pipe(map(t => t != null)); }

    get authenticating$(): Observable<boolean> { return this._authenticating$; }
}
