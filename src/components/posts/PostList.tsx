import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { useChunkedPosts } from '../../hooks/posts/chunked-posts.hook';
import PostCommentsProvider from '../comments/PostCommentsProvider';
import withRenderLog from '../shared/withRenderLog';
import UserProvider from '../users/UserProvider';
import PostCard from './PostCard';
import PostCommentsConsumer from './PostCard/PostCommentsConsumer';
import PostUserConsumer from './PostCard/PostUserConsumer';

const PostList = () => {
  const [posts, count, total, loadMore] = useChunkedPosts();

  return (
    <div className="px-3">
      <div className="card-deck">
        {posts.map(post => (
          <PostCard key={post.id} {...post}>
            <UserProvider id={post.userId} slug="users">
              <PostUserConsumer
                loadingUserLabel="Author is loading..."
                noUserLabel="Author could not be found!"
              />
            </UserProvider>
            <PostCommentsProvider postId={post.id}>
              <PostCommentsConsumer
                noCommentsLabel="There are no comments"
                loadingCommentsLabel="Comments are loading..."
              />
            </PostCommentsProvider>
          </PostCard>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        {count < total ? (
          <button className="btn btn-primary" onClick={loadMore}>
            LOAD MORE
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostList);
