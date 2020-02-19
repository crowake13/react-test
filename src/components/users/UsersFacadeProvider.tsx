import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { UsersContext } from '../../stores/users/users.context';
import { facade, IUsersFacade } from '../../stores/users/users.facade';
import withRenderLog from '../shared/withRenderLog';

interface UsersFacadeProviderProps extends Partial<IUsersFacade> {
  children: any;
}

const UsersFacadeProvider = ({
  children,
  ...props
}: UsersFacadeProviderProps) => {
  return (
    <UsersContext.Provider
      value={{
        searchTerm: props.searchTerm ?? facade.searchTerm,
        searchTerm$: props.searchTerm$ ?? facade.searchTerm$,
        getFilteredUsers: props.getFilteredUsers ?? facade.getFilteredUsers,
        updateSearchTerm: props.updateSearchTerm ?? facade.updateSearchTerm,
        errors: props.errors ?? facade.errors,
        error$: props.error$ ?? facade.error$,
        active$: props.active$ ?? facade.active$,
        activate: props.activate ?? facade.activate,
        getAll: props.getAll ?? facade.getAll,
        getById: props.getById ?? facade.getById,
        entitie$: props.entitie$ ?? facade.entitie$,
        isFetchingBySlug: props.isFetchingBySlug ?? facade.isFetchingBySlug,
        isFetching: props.isFetching ?? facade.isFetching,
        isFetching$: props.isFetching$ ?? facade.isFetching$,
        fetch: props.fetch ?? facade.fetch,
        fetchAll: props.fetchAll ?? facade.fetchAll,
        fetchById: props.fetchById ?? facade.fetchById
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  UsersFacadeProvider
);
