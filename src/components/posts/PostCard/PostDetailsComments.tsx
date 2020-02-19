import React, { useContext } from 'react';
import * as RENDER_LOG from '../../../constants/render-log';
import PostCommentsContext from '../../../stores/comments/post-comments.context';
import { CommentList } from '../../comments/CommentsList';
import withRenderLog from '../../shared/withRenderLog';

interface PostDetailsCommentsProps {
  loadingCommentsLabel: string;
  noCommentsLabel: string;
}

const PostDetailsComments = ({
  loadingCommentsLabel,
  noCommentsLabel
}: PostDetailsCommentsProps) => {
  const { comments } = useContext(PostCommentsContext);

  return (
    <div className="bg-light border-top">
      <div className="card-header">
        {!comments ? (
          loadingCommentsLabel
        ) : !comments.length ? (
          noCommentsLabel
        ) : (
          <span>Comments ({comments.length})</span>
        )}
      </div>
      {comments && comments.length ? <CommentList comments={comments} /> : null}
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  PostDetailsComments
);
