import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { Comment } from '../../stores/comments/comment.model';
import withRenderLog from '../shared/withRenderLog';
import { CommentListItem } from './CommentsListItem';

interface CommentListProps {
  comments: Comment[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="card-body m-0">
      {comments.map((comment, index) => (
        <CommentListItem
          key={comment.id}
          {...comment}
          showTopBoarder={!index}
        />
      ))}
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(CommentList);
