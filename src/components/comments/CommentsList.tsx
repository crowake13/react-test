import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { Comment } from '../../stores/comments/comment.model';
import withRenderLog from '../shared/withRenderLog';

interface CommentListProps {
  comments: Comment[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="card-body m-0">
      {comments.map((comment, index) => (
        <div key={comment.id} className={!index ? 'mb-2' : 'border-top mb-2'}>
          <h6 className="card-subtitle my-2 text-muted">{comment.email}</h6>
          <h5 className="card-title">{comment.name}</h5>
          <p className="card-text">{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(CommentList);
