import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { usePosts } from '../../hooks/posts/posts.hook';
import PostCommentsProvider from '../comments/PostCommentsProvider';
import withRenderLog from '../shared/withRenderLog';
import UserProvider from '../users/UserProvider';
import PostCard from './PostCard';
import PostCommentsConsumer from './PostCard/PostCommentsConsumer';
import PostUserConsumer from './PostCard/PostUserConsumer';

const PostList = () => {
  const [posts] = usePosts();

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
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostList);
