import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { Consumer } from '../../stores/comments/post-comments.context';
import withRenderLog from '../shared/withRenderLog';
import { CommentList } from './CommentsList';

const PostDetailsCommentsConsumer = ({
  loadingCommentsLabel,
  noCommentsLabel
}: any) => {
  return (
    <Consumer>
      {context =>
        !context ? null : (
          <div className="bg-light border-top">
            <div className="card-header">
              {!context.comments ? (
                loadingCommentsLabel
              ) : !context.comments.length ? (
                noCommentsLabel
              ) : (
                <span>Comments ({context.comments.length})</span>
              )}
            </div>
            <CommentList comments={context.comments} />
          </div>
        )
      }
    </Consumer>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  PostDetailsCommentsConsumer
);
