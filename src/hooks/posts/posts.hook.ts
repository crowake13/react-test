import { useObservable } from '@mindspace-io/utils';
import { useContext } from 'react';
import { ID } from '../../stores/entities/entity.facade';
import { Post } from '../../stores/posts/post.model';
import { PostsContext } from '../../stores/posts/posts.context';

export type PostsHookTuple = [Post[], (id: ID) => void];

/**
 * Custom Hook to manage a view Model for Post view components
 */
export function usePosts(): PostsHookTuple {
  const postsService = useContext(PostsContext);

  const [posts] = useObservable(postsService.entitie$, []);

  return [posts, postsService.activate.bind(postsService)];
}
