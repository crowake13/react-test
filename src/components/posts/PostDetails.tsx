import React, { useContext } from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { useActive } from '../../hooks/active.hook';
import { PostsContext } from '../../stores/posts/posts.context';
import PostCommentsProvider from '../comments/PostCommentsProvider';
import withRenderLog from '../shared/withRenderLog';
import UserProvider from '../users/UserProvider';
import PostCard from './PostCard';
import PostDetailsComments from './PostCard/PostDetailsComments';
import PostUser from './PostCard/PostUser';

const PostDetails = () => {
  const [post] = useActive(useContext(PostsContext));

  return (
    <div className="p-3">
      {post ? (
        <PostCard {...post}>
          <UserProvider id={post.userId} slug={`users/${post.userId}`}>
            <PostUser
              userId={post.userId}
              loadingUserLabel="Author is loading..."
              noUserLabel="Author could not be found!"
            />
          </UserProvider>
          <PostCommentsProvider postId={post.id}>
            <PostDetailsComments
              loadingCommentsLabel="Comments are loading..."
              noCommentsLabel="There are no comments"
            />
          </PostCommentsProvider>
        </PostCard>
      ) : null}
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostDetails);
