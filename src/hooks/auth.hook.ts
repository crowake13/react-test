import { useObservable } from '@mindspace-io/utils';
import { createContext, useContext } from 'react';
import { facade, ISessionFacade } from '../stores/session/session.facade';

export const SessionContext = createContext<ISessionFacade>(facade);

export type SessionHookTuple = [boolean, boolean, ISessionFacade];

/**
 * Custom Hook to manage a view Model for Session view components
 */
export const useAuth = (): SessionHookTuple => {
  const sessionService = useContext(SessionContext);

  const [isAuthenticating] = useObservable(
    sessionService.isAuthenticating$,
    sessionService.isCurrentlyAuthenticating
  );

  const [isAuthenticated] = useObservable(
    sessionService.isAuthenticated$,
    sessionService.isCurrentlyAuthenticated
  );

  return [isAuthenticating, isAuthenticated, sessionService];
};
