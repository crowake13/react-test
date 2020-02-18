import React, { useState } from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { useComments } from '../../hooks/comments/comments.hook';
import { Provider } from '../../stores/comments/post-comments.context';
import withRenderLog from '../shared/withRenderLog';

const PostCommentsProvider = ({ postId, children }: any) => {
  const [areCommentsVisible, toggleCommentsVisibility] = useState(false);

  const [, getCommentsByPostId] = useComments();

  return (
    <Provider
      value={{
        comments: getCommentsByPostId(postId),
        areCommentsVisible: areCommentsVisible,
        toggleCommentsVisibility: toggleCommentsVisibility
      }}
    >
      {children}
    </Provider>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  PostCommentsProvider
);
