import React, { useContext } from 'react';
import * as RENDER_LOG from '../../../constants/render-log';
import PostCommentsContext from '../../../stores/comments/post-comments.context';
import { CommentList } from '../../comments/CommentsList';
import withRenderLog from '../../shared/withRenderLog';

const PostDetailsCommentsConsumer = ({
  loadingCommentsLabel,
  noCommentsLabel
}: any) => {
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
      {comments ? <CommentList comments={comments} /> : null}
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  PostDetailsCommentsConsumer
);
