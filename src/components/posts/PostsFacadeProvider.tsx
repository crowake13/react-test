import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { PostsContext } from '../../stores/posts/posts.context';
import { facade, IPostsFacade } from '../../stores/posts/posts.facade';
import withRenderLog from '../shared/withRenderLog';

interface PostsFacadeProviderProps extends Partial<IPostsFacade> {
  children: any;
}

const PostsFacadeProvider = ({
  children,
  ...props
}: PostsFacadeProviderProps) => {
  return (
    <PostsContext.Provider
      value={{
        errors: props.errors ?? facade.errors,
        error$: props.error$ ?? facade.error$,
        active$: props.active$ ?? facade.active$,
        activate: props.activate ?? facade.activate,
        getAll: props.getAll ?? facade.getAll,
        getById: props.getById ?? facade.getById,
        hashMap: props.hashMap ?? facade.hashMap,
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
    </PostsContext.Provider>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  PostsFacadeProvider
);
