import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { Comment } from '../../stores/comments/comment.model';
import withRenderLog from '../shared/withRenderLog';

interface CommentListProps extends Comment {
  hideTopBoarder?: boolean;
}

export const CommentListItem = ({
  email,
  name,
  body,
  hideTopBoarder
}: CommentListProps) => {
  return (
    <div className={'mb-2' + (hideTopBoarder ? '' : ' border-top')}>
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
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  CommentListItem
);
