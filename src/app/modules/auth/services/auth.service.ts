
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { NotificationService } from 'app/modules/notification/services/notification.service';
import { BehaviorSubject, Observable, Subject, throwError, of } from 'rxjs';
import { catchError, finalize, map, tap, mergeMap } from 'rxjs/operators';
import { AuthResponse } from '../models/auth.response.model';
import { User } from '@models';

/**
 * Service that handle authentication process methods.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public static readonly STORE_KEY = 'flt-session';

    private _authToken$ = new BehaviorSubject<string>(null);
    private _authResponse$ = new BehaviorSubject<AuthResponse>(null);
    private _authenticating$ = new BehaviorSubject<boolean>(false);

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
            mergeMap(response => {
                if (response.token == null) {
                    return throwError({ status: 401 });
                }
                return of(response);
            }),
            tap(response => this.setToken(response.token)),
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

    public verifyToken(token: string): Observable<User> {
        this._authenticating$.next(true);
        this.setToken(token);
        const url = `${environment.api_endpoint}${environment.login_endpoint}/me`;
        return this._http.get<User>(url).pipe(
            finalize(() => this._authenticating$.next(false))
        );
    }

    public setToken(token: string) {
        this._authToken$.next(token);
    }

    public loginSuccess(authResponse: AuthResponse) {
        this._authResponse$.next(authResponse);
        this.storeToken(authResponse);
    }

    public logout() {
        // const url = `${environment.api_endpoint}/${environment.logout_endpoint}`;
        // return this._http.get(url).pipe(
        //     tap(() => this.logoutSuccess()),
        // );
        this.logoutSuccess();
        return of(true);
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

    public checkAutoLogin(): Observable<any> {
        const response = this.readToken();
        if (response != null) {
            return this.verifyToken(response.token).pipe(
                tap(() => this.loginSuccess(response))
            );
        }
        return of(false);
    }

    get authResponse$(): Observable<AuthResponse> { return this._authResponse$; }

    get token$(): Observable<string> {
        return this._authToken$;
    }

    get token(): string {
        return this._authToken$.value;
    }

    get authenticated$(): Observable<boolean> { return this._authResponse$.pipe(map(r => r != null)); }

    get authenticating$(): Observable<boolean> { return this._authenticating$; }

    get authenticating(): boolean { return this._authenticating$.value; }

}
