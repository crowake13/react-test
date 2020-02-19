import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { usePosts } from '../../hooks/posts/posts.hook';
import PostCommentsProvider from '../comments/PostCommentsProvider';
import withRenderLog from '../shared/withRenderLog';
import UserProvider from '../users/UserProvider';
import PostCard from './PostCard';
import PostComments from './PostCard/PostComments';
import PostUser from './PostCard/PostUser';

const PostList = () => {
  const [posts] = usePosts();

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
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostList);
