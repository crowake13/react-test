import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { usePosts } from '../../hooks/posts/posts.hook';
import PostCommentsConsumer from '../comments/PostCommentsConsumer';
import PostCommentsProvider from '../comments/PostCommentsProvider';
import withRenderLog from '../shared/withRenderLog';
import PostUserConsumer from '../users/PostUserConsumer';
import PostUserProvider from '../users/PostUserProvider';
import PostCard from './PostCard';

const PostList = () => {
  const [posts] = usePosts();

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
              />
            </PostCommentsProvider>
          </PostCard>
        ))}
      </div>
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostList);
