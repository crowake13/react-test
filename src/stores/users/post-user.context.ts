import { createContext } from 'react';
import { User } from './user.model';

const context = createContext<{
  user: User | null;
  isFetching: boolean;
} | null>(null);

export const { Provider, Consumer } = context;

export default context;
