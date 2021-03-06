import { APIModel } from '@models';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { tap, map, finalize } from 'rxjs/operators';
import { APIModelService } from './api-model.service';

export abstract class APIModelRepository<T extends APIModel> extends APIModelService<T> {

    protected _loading$ = new BehaviorSubject<boolean>(false);
    protected _creating$ = new BehaviorSubject<boolean>(false);
    protected _loaded$ = new BehaviorSubject<boolean>(false);
    protected _items$ = new BehaviorSubject<Map<string | number, T>>(new Map());
    protected _itemsLoading$ = new BehaviorSubject<Map<string | number, boolean>>(new Map());
    protected _itemsUpdating$ = new BehaviorSubject<Map<string | number, boolean>>(new Map());
    protected _itemsDeleting$ = new BehaviorSubject<Map<string | number, boolean>>(new Map());

    get items$(): Observable<T[]> {
        return this._items$.pipe(map(m => Array.from(m.values())));
    }
    get items(): T[] {
        return Array.from(this._items$.value.values());
    }
    get loading$(): Observable<boolean> { return this._loading$; }
    get loading(): boolean { return this._loading$.value; }
    get creating$(): Observable<boolean> { return this._creating$; }
    get creating(): boolean { return this._creating$.value; }
    get loaded$(): Observable<boolean> { return this._loaded$; }
    get loaded(): boolean { return this._loaded$.value; }

    item$(id$: Observable<number>): Observable<T> {
        return combineLatest(id$, this._items$, (id, items) => {
            return items.get(id);
        });
    }

    itemsLoading(id: number) {
        return this._itemsLoading$.pipe(map(m => m.get(id)));
    }

    itemsUpdating(id: number) {
        return this._itemsUpdating$.pipe(map(m => m.get(id)));
    }

    itemsDeleting(id: number) {
        return this._itemsDeleting$.pipe(map(m => m.get(id)));
    }

    protected setItem(item: T) {
        this._items$.value.set(item.id, item);
        this._items$.next(this._items$.value);
    }

    protected mergeItem(id: number, attributes: { [key: string]: any }) {
        const item = this._items$.value.get(id);
        for (const [name, value] of Object.entries(attributes)) {
            item[name] = value;
        }
        this._items$.value.set(id, item);
        this._items$.next(this._items$.value);
    }

    protected setItems(items: T[]) {
        for (const item of items) {
            this._items$.value.set(item.id, item);
        }
        this._items$.next(this._items$.value);
    }

    protected removeItem(id: string | number) {
        this._items$.value.delete(id);
        this._items$.next(this._items$.value);
    }

    protected setLoading(id: string | number, loading: boolean) {
        this._itemsLoading$.value.set(id, loading);
        this._itemsLoading$.next(this._itemsLoading$.value);
    }

    protected setUpdating(id: string | number, loading: boolean) {
        this._itemsUpdating$.value.set(id, loading);
        this._itemsUpdating$.next(this._itemsUpdating$.value);
    }

    protected setDeleting(id: string | number, loading: boolean) {
        this._itemsDeleting$.value.set(id, loading);
        this._itemsDeleting$.next(this._itemsDeleting$.value);
    }

    public create(item: T, url?: string): Observable<T> {
        this._creating$.next(true);
        return super.create(item, url).pipe(
            tap(res => {
                this.setItem(res);
            }),
            finalize(() => this._creating$.next(false))
        );
    }

    public load(url?: string): Observable<T[]> {
        this._loading$.next(true);
        return super.load(url).pipe(
            tap(res => {
                this.setItems(res);
                this._loaded$.next(true);
            }),
            finalize(() => this._loading$.next(false))
        );
    }

    public loadOne(id: number, url?: string): Observable<T> {
        this.setLoading(id, true);
        return super.loadOne(id, url).pipe(
            tap(res => {
                this.setItem(res);
            }),
            finalize(() => this.setLoading(id, false))
        );
    }

    public update(item: T, url?: string): Observable<T> {
        this.setUpdating(item.id, true);
        return super.update(item, url).pipe(
            tap(res => {
                this.setItem(res);
            }),
            finalize(() => this.setUpdating(item.id, false))
        );
    }

    public patch(id: number, attributes: { [name: string]: any }, url?: string): Observable<T> {
        this.setUpdating(id, true);
        return super.patch(id, attributes, url).pipe(
            tap(res => {
                this.mergeItem(id, res);
            }),
            finalize(() => this.setUpdating(id, false))
        );
    }

    public delete(id: number, url?: string): Observable<number> {
        this.setDeleting(id, true);
        return super.delete(id, url).pipe(
            tap(res => {
                this.removeItem(id);
            }),
            finalize(() => this.setDeleting(id, false))
        );
    }

    public save(item: T, url?: string): Observable<T> {
        if (item.id) {
            return this.update(item, url);
        }
        return this.create(item, url);
    }
}
