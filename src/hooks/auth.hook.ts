import { useObservable } from '@mindspace-io/utils';
import { useContext } from 'react';
import { SessionContext } from '../stores/session/session.context';
import { ICredentials } from '../stores/session/session.facade';

export type SessionHookQuadruple = [
  boolean,
  boolean,
  (creds: ICredentials) => Promise<void>,
  () => void
];

/**
 * Custom Hook to manage a view Model for Session view components
 */
export const useAuth = (): SessionHookQuadruple => {
  const sessionService = useContext(SessionContext);

  const [isAuthenticating] = useObservable(
    sessionService.isAuthenticating$,
    sessionService.isCurrentlyAuthenticating
  );

  const [isAuthenticated] = useObservable(
    sessionService.isAuthenticated$,
    sessionService.isCurrentlyAuthenticated
  );

  return [
    isAuthenticating,
    isAuthenticated,
    sessionService.login.bind(sessionService),
    sessionService.logout.bind(sessionService)
  ];
};
