import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { usePosts } from '../../hooks/posts/posts.hook';
import { Post } from '../../stores/posts/post.model';
import withRenderLog from '../shared/withRenderLog';
import PostItem from './PostItem';

const PostList = () => {
  const [posts] = usePosts();

  return (
    <div className="px-3">
      <div className="card-deck">
        {posts.map((post: Post) => (
          <PostItem className="m-2" key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostList);
