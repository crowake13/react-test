import { useObservable } from '@mindspace-io/utils';
import { useContext } from 'react';
import { User } from '../../stores/users/user.model';
import { UsersContext } from '../../stores/users/users.context';
import { IUsersFacade } from '../../stores/users/users.facade';

export type UsersHookTuple = [User[], IUsersFacade];

/**
 * Custom Hook to manage a view Model for User view components
 */
export function useUsers(): UsersHookTuple {
  const usersService = useContext(UsersContext);

  const [users] = useObservable(usersService.entitie$, []);

  return [users, usersService];
}
