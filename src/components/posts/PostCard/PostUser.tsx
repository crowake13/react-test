import React, { useContext, useEffect } from 'react';
import * as RENDER_LOG from '../../../constants/render-log';
import { ID } from '../../../stores/entities/entity.facade';
import PostUserContext from '../../../stores/users/post-user.context';
import { UsersContext } from '../../../stores/users/users.context';
import withRenderLog from '../../shared/withRenderLog';

interface PostUserProps {
  userId: ID;
  loadingUserLabel: string;
  noUserLabel: string;
}

const PostUser = ({ userId, loadingUserLabel, noUserLabel }: PostUserProps) => {
  const postUserContext = useContext(PostUserContext);
  const userService = useContext(UsersContext);

  useEffect(() => {
    if (userId && !postUserContext?.user) {
      userService.fetchById(userId);
    }
  }, [postUserContext, userId, userService]);

  return !postUserContext ? null : (
    <h6 className="card-subtitle mb-2 text-muted">
      {postUserContext.user?.name ??
        (postUserContext.isFetching
          ? loadingUserLabel
          : postUserContext.user?.name ?? noUserLabel)}
    </h6>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostUser);
