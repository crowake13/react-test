import { useObservable } from '@mindspace-io/utils';
import { useContext } from 'react';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentsContext } from '../stores/comments/comments.context';
import { PostsContext } from '../stores/posts/posts.context';
import { UsersContext } from '../stores/users/users.context';

export type FetchHookDuple = [boolean, () => void];

/**
 * Custom Hook to manage a view Model for Post view components
 */
export function useFetchAll(): FetchHookDuple {
  const postsService = useContext(PostsContext);
  const usersService = useContext(UsersContext);
  const commentsService = useContext(CommentsContext);

  const [isFetchingAll] = useObservable(
    combineLatest([
      postsService.isFetching$.pipe(map(isFetching => isFetching['posts'])),
      usersService.isFetching$.pipe(map(isFetching => isFetching['users'])),
      commentsService.isFetching$.pipe(
        map(isFetching => isFetching['comments'])
      )
    ]).pipe(
      map(([isFetchingPosts, isFetchingUsers, isFetchingComments]) => {
        return isFetchingPosts || isFetchingUsers || isFetchingComments;
      })
    )
  );

  return [
    !!isFetchingAll,
    () => {
      postsService.fetchAll();
      usersService.fetchAll();
      commentsService.fetchAll();
    }
  ];
}
