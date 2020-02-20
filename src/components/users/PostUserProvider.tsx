import { useObservable } from '@mindspace-io/utils';
import React, { useContext } from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { useFetch } from '../../hooks/fetch.hook';
import { ID } from '../../stores/entities/entity.facade';
import PostUserContext from '../../stores/users/post-user.context';
import { UsersContext } from '../../stores/users/users.context';
import withRenderLog from '../shared/withRenderLog';

const PostUserProvider = ({
  id,
  slug,
  children
}: {
  id: ID;
  slug: string;
  children?: any;
}) => {
  const usersService = useContext(UsersContext);
  const [isFetching] = useFetch(usersService, slug);
  const [users] = useObservable(usersService.entitie$, []);

  const user = users.filter(entity => entity.id === id)[0] ?? null;

  return (
    <PostUserContext.Provider
      value={{
        user,
        isFetching
      }}
    >
      {children}
    </PostUserContext.Provider>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  PostUserProvider
);
