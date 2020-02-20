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
  const { user, isFetching } = useContext(PostUserContext);
  const userService = useContext(UsersContext);

  useEffect(() => {
    if (userId && !user) {
      userService.fetchById(userId);
    }
  }, [user, userId, userService]);

  const label = !user
    ? isFetching
      ? loadingUserLabel
      : noUserLabel
    : user.name;

  return (
    <h6 title={label} className="card-subtitle mb-2 text-muted line-clamp-1">
      {label}
    </h6>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostUser);
