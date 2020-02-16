import { useObservable } from '@mindspace-io/utils';
import { useContext } from 'react';
import { UsersContext } from '../../stores/users/users.context';

export type UsersSearchTermHookDuple = [string, (text: string) => void];

/**
 * Custom Hook to manage a view Model for User view components
 */
export function useUsersSearchTerm(): UsersSearchTermHookDuple {
  const usersService = useContext(UsersContext);

  const [searchTerm] = useObservable(
    usersService.searchTerm$,
    usersService.searchTerm
  );

  return [searchTerm, usersService.updateSearchTerm.bind(usersService)];
}
