import React, { useContext } from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { context } from '../../stores/users/post-user.context';
import withRenderLog from '../shared/withRenderLog';
import UserLabel from './UserLabel';

const PostUserConsumer = ({ loadingUserLabel, noUserLabel }: any) => {
  const postUserContext = useContext(context);

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
