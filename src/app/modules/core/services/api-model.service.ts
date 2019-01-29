import { APIModel } from '@models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

export abstract class APIModelService<T extends APIModel> {
    public static readonly DEFAULT_PAGINATION_SIZE = 20;
    protected _baseUrl: string;

    constructor(protected _httpClient: HttpClient, protected _url: string) {
        this._baseUrl = `${environment.api_endpoint}`;
        this._url = `${this._baseUrl}${this._url}`;
    }

    public create(item: T, url: string = this._url): Observable<T> {
        return this._httpClient.post<T>(url, item);
    }

    public load(url: string = this._url): Observable<T[]> {
        return this._httpClient.get<T[]>(url);
    }

    public loadOne(id: number, url: string = this._url): Observable<T> {
        return this._httpClient.get<T>(`${url}/${id}`);
    }

    public update(item: T, url: string = this._url): Observable<T> {
        return this._httpClient.put<T>(`${url}/${item.id}`, item);
    }

    public patch(id: number, attributes: { [name: string]: any }, url: string = this._url): Observable<T> {
        return this._httpClient.patch<T>(`${url}/${id}`, attributes);
    }

    public delete(id: number, url: string = this._url): Observable<T> {
        return this._httpClient.delete<T>(`${url}/${id}`);
    }

    public save(item: T, url: string = this._url): Observable<T> {
        if (item.id) {
            return this.update(item, url);
        }
        return this.create(item, url);
    }
}
