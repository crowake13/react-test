import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as RENDER_LOG from '../../constants/render-log';
import { Post } from '../../stores/posts/post.model';
import withRenderLog from '../shared/withRenderLog';

interface PostCardProps {
  post: Post;
  children?: any;
}

const PostCard = ({ post, children }: PostCardProps) => {
  const { pathname } = useLocation();

  return (
    <div className="card mb-3">
      <div className="card-body">
        {children[0]}
        <h5 className="card-title">
          {pathname !== `/post/${post.id}` ? (
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          ) : (
            post.title
          )}
        </h5>
        <p className="card-text">{post.body}</p>
      </div>
      {children[1]}
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostCard);
