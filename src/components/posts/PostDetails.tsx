import React, { useContext } from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { useActive } from '../../hooks/active.hook';
import { PostsContext } from '../../stores/posts/posts.context';
import PostCommentsProvider from '../comments/PostCommentsProvider';
import PostDetailsCommentsConsumer from '../comments/PostDetailsCommentsConsumer';
import withRenderLog from '../shared/withRenderLog';
import PostUserConsumer from '../users/PostUserConsumer';
import PostUserProvider from '../users/PostUserProvider';
import PostCard from './PostCard';

const PostDetails = () => {
  const [post] = useActive(useContext(PostsContext));

  return (
    <div className="p-3">
      {post ? (
        <PostCard {...post}>
          <PostUserProvider id={post.userId} slug={`users/${post.userId}`}>
            <PostUserConsumer
              userId={post.userId}
              loadingUserLabel="Author is loading..."
              noUserLabel="Author could not be found!"
            />
          </PostUserProvider>
          <PostCommentsProvider postId={post.id}>
            <PostDetailsCommentsConsumer
              noCommentsLabel="There are no comments"
              loadingCommentsLabel="Comments are loading..."
            />
          </PostCommentsProvider>
        </PostCard>
      ) : null}
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostDetails);
