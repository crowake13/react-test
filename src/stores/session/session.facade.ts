import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export interface ICredentials {
  email: string;
  password: string;
}

export interface ISessionFacade {
  isCurrentlyAuthenticating: boolean;
  isAuthenticating$: Observable<boolean>;
  isCurrentlyAuthenticated: boolean;
  isAuthenticated$: Observable<boolean>;
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

  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  readonly isAuthenticated$ = this._isAuthenticated$
    .asObservable()
    .pipe(distinctUntilChanged());

  get isCurrentlyAuthenticated() {
    return this._isAuthenticated$.getValue();
  }

  private async _login({ email, password }: ICredentials): Promise<boolean> {
    await this._timeout(2500);
    return email === 'blabla' && password === 'asdf';
  }

  async login(creds: ICredentials): Promise<void> {
    this._isAuthenticating$.next(true);
    this._isAuthenticated$.next(await this._login(creds));
    this._isAuthenticating$.next(false);
  }

  private _timeout(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  logout(): void {
    this._isAuthenticated$.next(false);
  }
}

export const facade = new SessionFacade();
