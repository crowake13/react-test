import React, { useState } from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { useChunkedPosts } from '../../hooks/posts/chunked-posts.hook';
import { Post } from '../../stores/posts/post.model';
import PostCommentsProvider from '../comments/PostCommentsProvider';
import withRenderLog from '../shared/withRenderLog';
import UserProvider from '../users/UserProvider';
import PostCard from './PostCard';
import PostComments from './PostCard/PostComments';
import PostUser from './PostCard/PostUser';

const PostList = () => {
  const [chunkedPosts] = useChunkedPosts();
  const [count, setCount] = useState<number>(1);

  let posts: Post[] = [];

  for (let i = 0; i < count; i++) {
    if (chunkedPosts[i]) {
      posts = [...posts, ...chunkedPosts[i]];
    }
  }

  return (
    <div className="px-3">
      <div className="card-deck">
        {posts.map(post => (
          <PostCard key={post.id} {...post}>
            <UserProvider id={post.userId} slug="users">
              <PostUser
                loadingUserLabel="Author is loading..."
                noUserLabel="Author could not be found!"
              />
            </UserProvider>
            <PostCommentsProvider postId={post.id}>
              <PostComments
                loadingCommentsLabel="Comments are loading..."
                noCommentsLabel="There are no comments"
              />
            </PostCommentsProvider>
          </PostCard>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        {count < chunkedPosts.length ? (
          <button
            className="btn btn-primary"
            onClick={() => setCount(count + 1)}
          >
            LOAD MORE
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostList);
