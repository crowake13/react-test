import { createContext } from 'react';
import { facade, IUsersFacade } from './users.facade';

export const UsersContext = createContext<IUsersFacade>(facade);
