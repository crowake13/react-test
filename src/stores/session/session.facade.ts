import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface ICredentials {
  email: string;
  password: string;
}

export interface ISessionFacade {
  isCurrentlyAuthenticating: boolean;
  isAuthenticating$: Observable<boolean>;
  isCurrentlyAuthenticated: boolean;
  isAuthenticated$: Observable<boolean>;
  accessToken: string | null;
  login(creds: ICredentials): Promise<void>;
  logout(): void;
}

export class SessionFacade implements ISessionFacade {
  private _isAuthenticating$ = new BehaviorSubject<boolean>(false);
  readonly isAuthenticating$ = this._isAuthenticating$
    .asObservable()
    .pipe(distinctUntilChanged());

  get isCurrentlyAuthenticating() {
    return this._isAuthenticating$.getValue();
  }

  private _accessToken$ = new BehaviorSubject<string | null>(null);
  readonly isAuthenticated$ = this._accessToken$.asObservable().pipe(
    map(accessToken => !!accessToken),
    distinctUntilChanged()
  );

  get accessToken() {
    return this._accessToken$.getValue();
  }

  get isCurrentlyAuthenticated() {
    return !!this.accessToken;
  }

  private async _token({
    email,
    password
  }: ICredentials): Promise<string | null> {
    await this._timeout(2500);
    return email === process.env.REACT_APP_VALID_EMAIL &&
      password === process.env.REACT_APP_VALID_PASSWORD
      ? process.env.REACT_APP_ACCESS_TOKEN ?? null
      : null;
  }

  async login(creds: ICredentials): Promise<void> {
    this._isAuthenticating$.next(true);
    this._accessToken$.next(await this._token(creds));
    this._isAuthenticating$.next(false);
  }

  private _timeout(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  logout(): void {
    this._accessToken$.next(null);
  }
}

export const facade = new SessionFacade();
