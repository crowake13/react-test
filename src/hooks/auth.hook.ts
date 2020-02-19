import { useContext } from 'react';
import { AuthContext, AUTH_ACTIONS } from '../stores/session/session.provider';

export interface ICredentials {
  email: string;
  password: string;
}

export type SessionHookQuadruple = [
  boolean,
  boolean,
  (creds: ICredentials) => Promise<void>,
  () => void
];

export const useAuth = (): SessionHookQuadruple => {
  const [{ isAuthenticating, isAuthenticated }, dispatch] = useContext(
    AuthContext
  );

  const _token = async ({
    email,
    password
  }: ICredentials): Promise<string | null> => {
    await ((ms: number) => new Promise(resolve => setTimeout(resolve, ms)))(
      1500
    );

    return email === process.env.REACT_APP_VALID_EMAIL &&
      password === process.env.REACT_APP_VALID_PASSWORD
      ? process.env.REACT_APP_ACCESS_TOKEN ?? null
      : null;
  };

  const login = async (creds: ICredentials) => {
    dispatch({ type: AUTH_ACTIONS.START_AUTH });
    dispatch({ type: AUTH_ACTIONS.END_AUTH, payload: await _token(creds) });
  };

  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  return [isAuthenticating, isAuthenticated, login, logout];
};
