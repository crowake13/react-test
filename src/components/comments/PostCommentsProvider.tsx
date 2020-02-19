import React, { useState } from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { useComments } from '../../hooks/comments/comments.hook';
import PostCommentsContext from '../../stores/comments/post-comments.context';
import { ID } from '../../stores/entities/entity.facade';
import withRenderLog from '../shared/withRenderLog';

interface PostCommentsProvider {
  postId: ID;
  areCommentsVisibleOnInit?: boolean;
  children: any;
}

const PostCommentsProvider = ({
  postId,
  areCommentsVisibleOnInit,
  children
}: PostCommentsProvider) => {
  const [areCommentsVisible, toggleCommentsVisibility] = useState(
    areCommentsVisibleOnInit ?? false
  );

  const [, getCommentsByPostId] = useComments();

  return (
    <PostCommentsContext.Provider
      value={{
        comments: getCommentsByPostId(postId),
        areCommentsVisible: areCommentsVisible,
        toggleCommentsVisibility: toggleCommentsVisibility
      }}
    >
      {children}
    </PostCommentsContext.Provider>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  PostCommentsProvider
);
