import React, { useContext, useEffect } from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { context } from '../../stores/users/post-user.context';
import { UsersContext } from '../../stores/users/users.context';
import withRenderLog from '../shared/withRenderLog';
import UserLabel from './UserLabel';

const PostUserConsumer = ({ userId, loadingUserLabel, noUserLabel }: any) => {
  const postUserContext = useContext(context);
  const userService = useContext(UsersContext);

  useEffect(() => {
    if (userId && !postUserContext?.user) {
      userService.fetchById(userId);
    }
  }, [postUserContext, userId, userService]);

  return !postUserContext ? null : (
    <UserLabel
      label={
        postUserContext.user?.name ??
        (postUserContext.isFetching
          ? loadingUserLabel
          : postUserContext.user?.name ?? noUserLabel)
      }
    />
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  PostUserConsumer
);
