import { createContext } from 'react';
import { facade, ISessionFacade } from './session.facade';

export const SessionContext = createContext<ISessionFacade>(facade);
