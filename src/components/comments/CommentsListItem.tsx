import React, { useState } from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { Comment } from '../../stores/comments/comment.model';
import withRenderLog from '../shared/withRenderLog';

interface CommentListProps extends Comment {
  hideTopBoarder: boolean;
}

export const CommentListItem = ({
  email,
  name,
  body,
  hideTopBoarder
}: CommentListProps) => {
  const [visibility, setVisibility] = useState<boolean>(false);

  return (
    <div
      className={'mb-2' + (hideTopBoarder ? '' : ' border-top')}
      onClick={() => setVisibility(!visibility)}
    >
      <h6
        title={email}
        className={`card-subtitle my-2 text-muted${
          visibility ? '' : ' line-clamp-1'
        }`}
      >
        {email}
      </h6>
      <h5
        title={name}
        className={`card-title ${visibility ? '' : ' line-clamp-1'}`}
      >
        {name}
      </h5>
      <p
        title={body}
        className={`card-text ${visibility ? '' : ' line-clamp-1'}`}
      >
        {body}
      </p>
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  CommentListItem
);
