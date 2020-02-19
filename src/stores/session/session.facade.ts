import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

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

  private _accessToken$ = new BehaviorSubject<string | null>(
    localStorage.getItem('token')
  );
  /**
   * update accessToken in localStorage every time the accesstoken is renewed
   * and map to boolean to get isAuthenticated flag
   */
  readonly isAuthenticated$ = this._accessToken$.asObservable().pipe(
    tap(accessToken =>
      accessToken
        ? localStorage.setItem('token', accessToken)
        : localStorage.removeItem('token')
    ),
    map(accessToken => !!accessToken),
    distinctUntilChanged()
  );

  get accessToken() {
    return this._accessToken$.getValue();
  }

  get isCurrentlyAuthenticated() {
    return !!this.accessToken;
  }

  /**
   * return accessToken if credentials are valid
   */
  private async _token({
    email,
    password
  }: ICredentials): Promise<string | null> {
    // delay to simulate API call
    await ((ms: number) => new Promise(resolve => setTimeout(resolve, ms)))(
      1500
    );

    return email === process.env.REACT_APP_VALID_EMAIL &&
      password === process.env.REACT_APP_VALID_PASSWORD
      ? process.env.REACT_APP_ACCESS_TOKEN ?? null
      : null;
  }

  /**
   * set isAuthenticating flag to true until credentials get validated
   */
  async login(creds: ICredentials): Promise<void> {
    this._isAuthenticating$.next(true);
    this._accessToken$.next(await this._token(creds));
    this._isAuthenticating$.next(false);
  }

  /**
   * remove accessToken from store
   * (which removes it from localStorage)
   */
  logout(): void {
    this._accessToken$.next(null);
  }
}

export const facade = new SessionFacade();
