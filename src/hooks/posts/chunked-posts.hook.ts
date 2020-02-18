import { useEffect, useRef, useState } from 'react';
import { Post } from '../../stores/posts/post.model';
import { usePosts } from './posts.hook';

export type PostsHookTuple = [Post[], number, number, () => void];

/**
 * Custom Hook to manage a view Model for Post view components
 */
export const useChunkedPosts = (chunkSize: number = 20): PostsHookTuple => {
  const chunked = useRef<Post[][]>([]);
  const [posts] = usePosts();
  const [count, setCount] = useState(posts.length ? 1 : 0);

  useEffect(() => {
    chunked.current = [];
    setCount(posts.length ? 1 : 0);

    let i,
      j,
      chunkedPosts: Post[][] = [];

    for (i = 0, j = posts.length; i < j; i += chunkSize) {
      chunkedPosts.push(posts.slice(i, i + chunkSize));
    }

    chunked.current = chunkedPosts;
  }, [chunkSize, posts]);

  let toRender: Post[] = [];

  for (let i = 0; i < count; i++) {
    toRender = [...toRender, ...chunked.current[i]];
  }

  return [toRender, count, chunked.current.length, () => setCount(count + 1)];
};
