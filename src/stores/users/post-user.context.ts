import { createContext } from 'react';
import { User } from './user.model';

export const context = createContext<{
  user: User | null;
  isFetching: boolean;
} | null>(null);

export const { Provider, Consumer } = context;
