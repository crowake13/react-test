import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Utils } from './utils';

export type ID = string | number;

export interface IEntity<K> {
  id: K;
}

export interface IEntityFacade<T extends IEntity<K>, K extends any = ID> {
  errors: { [key: string]: boolean };
  error$: Observable<{ [key: string]: boolean }>;
  active$: Observable<T | null>;
  activate(id: K): void;
  getAll(): T[];
  getById(key: K): T | null;
  entitie$: Observable<T[]>;
  isFetchingBySlug(slug: string): boolean;
  isFetching: { [key: string]: boolean };
  isFetching$: Observable<{ [key: string]: boolean }>;
  fetch(slug: string, set: boolean, delay: number): Promise<void>;
}

export abstract class EntityFacade<T extends IEntity<K>, K extends any = ID>
  implements IEntityFacade<T, K> {
  protected _error$ = new BehaviorSubject<{ [key: string]: boolean }>({});
  readonly error$ = this._error$.asObservable().pipe(distinctUntilChanged());

  get errors() {
    return this._error$.getValue();
  }

  protected _entitie$ = new BehaviorSubject<Map<string, T>>(
    new Map<string, T>()
  );
  readonly entitie$ = this._entitie$
    .asObservable()
    .pipe(distinctUntilChanged(), map(this.arrayFromMap));

  protected get hashMap() {
    return this._entitie$.getValue();
  }

  getAll() {
    return this.arrayFromMap(this.hashMap);
  }

  getById(key: K): T | null {
    return this.hashMap.get(`${key}`) ?? null;
  }

  protected _isFetching$ = new BehaviorSubject<{ [key: string]: boolean }>({});
  readonly isFetching$ = this._isFetching$
    .asObservable()
    .pipe(distinctUntilChanged());

  get isFetching() {
    return this._isFetching$.getValue();
  }

  protected startFetching(slug: string) {
    this._isFetching$.next({
      ...this.isFetching,
      [slug]: true
    });
  }

  protected endFetching(slug: string) {
    this._isFetching$.next({
      ...this.isFetching,
      [slug]: false
    });
  }

  isFetchingBySlug(slug: string) {
    return this.isFetching[slug];
  }

  private _active$ = new BehaviorSubject<K | null>(null);

  readonly active$ = combineLatest(this._entitie$, this._active$).pipe(
    map(([hashMap, active]) => {
      return active ? hashMap.get(`${active}`) ?? null : null;
    }),
    distinctUntilChanged()
  );

  constructor(protected authHeader: { [key: string]: string } = {}) {
    if (
      process.env.REACT_APP_AUTH_HEADER &&
      process.env.REACT_APP_ACCESS_TOKEN
    ) {
      authHeader[process.env.REACT_APP_AUTH_HEADER] =
        process.env.REACT_APP_ACCESS_TOKEN;
    }
  }

  protected arrayFromMap(hashMap: Map<string, T>): T[] {
    return Array.from(hashMap).map(([key, item]) => item);
  }

  protected mapFromArray(array: T[], initMap?: Map<string, T>): Map<string, T> {
    const hashMap = initMap
      ? new Map<string, T>(initMap)
      : new Map<string, T>();

    array
      .filter(item => !!item)
      .forEach(item => {
        hashMap.set(`${item.id}`, item);
      });

    return hashMap;
  }

  protected doesEntityExistAsIs(
    entity: T,
    hashMap = this._entitie$.getValue()
  ) {
    return Utils.areObjectsEqual(entity, hashMap.get(`${entity.id}`));
  }

  protected add(input: T[] | T) {
    const hashMap = this._entitie$.getValue();

    if (input instanceof Array) {
      if (
        input.filter(entity => !this.doesEntityExistAsIs(entity, hashMap))
          .length
      ) {
        this._entitie$.next(this.mapFromArray(input, hashMap));
      }
    } else if (!this.doesEntityExistAsIs(input)) {
      this._entitie$.next(this.mapFromArray([input], hashMap));
    }
  }

  protected set(input: T[] | T) {
    const hashMap = this._entitie$.getValue();

    if (input instanceof Array) {
      if (
        input.length !== hashMap.size ||
        input.filter(entity => !this.doesEntityExistAsIs(entity, hashMap))
          .length
      ) {
        this._entitie$.next(this.mapFromArray(input));
      }
    } else if (!this.doesEntityExistAsIs(input)) {
      this._entitie$.next(this.mapFromArray([input]));
    }
  }

  async fetch(slug: string, set: boolean = false, delay: number = 0) {
    if (!this.isFetchingBySlug(slug)) {
      this.startFetching(slug);

      try {
        const response: T[] | T = await fetch(
          `${process.env.REACT_APP_API_URL}/${slug}`,
          {
            method: 'GET',
            headers: {
              ...this.authHeader
            }
          }
        ).then(response => {
          return response.json();
        });

        if (process.env.NODE_ENV !== 'production') {
          await ((ms: number) =>
            new Promise(resolve => setTimeout(resolve, ms)))(delay);
        }

        set ? this.set(response) : this.add(response);

        this._error$.next({
          ...this.errors,
          [slug]: false
        });
      } catch (e) {
        this._error$.next({
          ...this.errors,
          [slug]: true
        });
        console.error(e);
      } finally {
        this.endFetching(slug);
      }
    }
  }

  activate(id: K) {
    this._active$.next(id);
  }
}
