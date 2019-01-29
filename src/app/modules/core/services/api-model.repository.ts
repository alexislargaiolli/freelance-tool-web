import { APIModel } from '@models';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIModelService } from './api-model.service';
import { tap } from 'rxjs/operators';

export abstract class APIModelRepository<T extends APIModel> extends APIModelService<T> {
    protected _items$ = new BehaviorSubject<Map<string | number, T>>(new Map());
    protected _itemsMap = new Map<string | number, T>();

    protected setItem(item: T) {
        this._itemsMap.set(item.id, item);
        this._items$.next(this._itemsMap);
    }

    protected setItems(items: T[]) {
        for (const item of items) {
            this._itemsMap.set(item.id, item);
        }
        this._items$.next(this._itemsMap);
    }

    protected removeItem(id: string | number) {
        this._itemsMap.delete(id);
        this._items$.next(this._itemsMap);
    }

    public create(item: T, url: string = this._url): Observable<T> {
        return super.create(item, url).pipe(
            tap(res => this.setItem(res))
        );
    }

    public load(url: string = this._url): Observable<T[]> {
        return super.load(url).pipe(
            tap(res => this.setItems(res))
        );
    }

    public loadOne(id: number, url: string = this._url): Observable<T> {
        return super.loadOne(id, url).pipe(
            tap(res => this.setItem(res))
        );
    }

    public update(item: T, url: string = this._url): Observable<T> {
        return super.update(item, url).pipe(
            tap(res => this.setItem(res))
        );
    }

    public patch(id: number, attributes: { [name: string]: any }, url: string = this._url): Observable<T> {
        return super.patch(id, attributes, url).pipe(
            tap(res => this.setItem(res))
        );
    }

    public delete(id: number, url: string = this._url): Observable<T> {
        return super.delete(id, url).pipe(
            tap(res => this.removeItem(res.id))
        );
    }

    public save(item: T, url: string = this._url): Observable<T> {
        if (item.id) {
            return this.update(item, url);
        }
        return this.create(item, url);
    }
}
