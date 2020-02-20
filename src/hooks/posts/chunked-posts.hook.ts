import { Post } from '../../stores/posts/post.model';
import { usePosts } from './posts.hook';

export type PostsHookTuple = [Post[][]];

/**
 * Custom Hook to manage a view Model for Post view components
 */
export const useChunkedPosts = (chunkSize: number = 20): PostsHookTuple => {
  const [posts] = usePosts();

  const chunkedPosts: Post[][] = [];

  for (let i = 0, j = posts.length; i < j; i += chunkSize) {
    chunkedPosts.push(posts.slice(i, i + chunkSize));
  }

  return [chunkedPosts];
};
