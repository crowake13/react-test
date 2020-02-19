import React, { useContext } from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { useFetch } from '../../hooks/fetch.hook';
import { ID } from '../../stores/entities/entity.facade';
import { Provider } from '../../stores/users/post-user.context';
import { UsersContext } from '../../stores/users/users.context';
import withRenderLog from '../shared/withRenderLog';

const UserProvider = ({
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

  return (
    <Provider
      value={{
        user: usersService.getById(id),
        isFetching: isFetching
      }}
    >
      {children}
    </Provider>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(UserProvider);
