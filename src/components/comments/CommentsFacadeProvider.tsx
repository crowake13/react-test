import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { CommentsContext } from '../../stores/comments/comments.context';
import { facade, ICommentsFacade } from '../../stores/comments/comments.facade';
import withRenderLog from '../shared/withRenderLog';

interface CommentsFacadeProviderProps extends Partial<ICommentsFacade> {
  children: any;
}

const CommentsFacadeProvider = ({
  children,
  ...props
}: CommentsFacadeProviderProps) => {
  return (
    <CommentsContext.Provider
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
        fetchAll: props.fetchAll ?? facade.fetchAll
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  CommentsFacadeProvider
);
