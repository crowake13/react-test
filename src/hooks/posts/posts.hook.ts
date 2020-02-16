import { useObservable } from '@mindspace-io/utils';
import { useContext } from 'react';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ID } from '../../stores/entities/entity.facade';
import { Post } from '../../stores/posts/post.model';
import { PostsContext } from '../../stores/posts/posts.context';
import { UsersContext } from '../../stores/users/users.context';

export type PostsHookTuple = [Post[], (id: ID) => void];

/**
 * Custom Hook to manage a view Model for Post view components
 */
export function usePosts(): PostsHookTuple {
  const postsService = useContext(PostsContext);
  const usersService = useContext(UsersContext);

  const [posts] = useObservable(
    combineLatest(
      postsService.entitie$,
      usersService.entitie$,
      usersService.searchTerm$
    ).pipe(
      map(([posts, users, searchTerm]) => {
        if (searchTerm === '') {
          return posts;
        }

        const userIds = usersService
          .getFilteredUsers(users, searchTerm)
          .map(user => user.id);

        return posts.filter(post => {
          return userIds.indexOf(post.userId) !== -1;
        });
      })
    ),
    []
  );

  return [posts, postsService.activate.bind(postsService)];
}
