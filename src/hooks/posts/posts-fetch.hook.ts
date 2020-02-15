import { useObservable } from '@mindspace-io/utils';
import { useContext } from 'react';
import { PostsContext } from '../../stores/posts/posts.context';

export type FetchPostsHookDuple = [boolean, boolean];

/**
 * Custom Hook to manage a view Model for Post view components
 */
export function usePostsFetch(slug: string): FetchPostsHookDuple {
  const postsService = useContext(PostsContext);

  const [isFetching] = useObservable(
    postsService.isFetching$,
    postsService.isFetching
  );

  return [isFetching[slug], postsService.errors[slug]];
}
