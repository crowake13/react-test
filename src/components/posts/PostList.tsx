import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { useChunkedPosts } from '../../hooks/posts/chunked-posts.hook';
import PostCommentsConsumer from '../comments/PostCommentsConsumer';
import PostCommentsProvider from '../comments/PostCommentsProvider';
import withRenderLog from '../shared/withRenderLog';
import PostUserConsumer from '../users/PostUserConsumer';
import PostUserProvider from '../users/PostUserProvider';
import PostCard from './PostCard';

const PostList = () => {
  const [posts, count, total, loadMore] = useChunkedPosts();

  return (
    <div className="px-3">
      <div className="card-deck">
        {posts.map(post => (
          <PostCard key={post.id} {...post}>
            <PostUserProvider id={post.userId} slug="users">
              <PostUserConsumer
                loadingUserLabel="Author is loading..."
                noUserLabel="Author could not be found!"
              />
            </PostUserProvider>
            <PostCommentsProvider postId={post.id}>
              <PostCommentsConsumer
                noCommentsLabel="There are no comments"
                loadingCommentsLabel="Comments are loading..."
              ></PostCommentsConsumer>
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
