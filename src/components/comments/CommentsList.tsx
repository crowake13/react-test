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
      {comments.map(({ id, email, name, body }, index) => (
        <div key={id} className={'mb-2' + (!index ? '' : ' border-top')}>
          <h6 title={email} className="card-subtitle my-2 text-muted">
            {email}
          </h6>
          <h5 title={name} className="card-title">
            {name}
          </h5>
          <p title={body} className="card-text">
            {body}
          </p>
        </div>
      ))}
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(CommentList);
