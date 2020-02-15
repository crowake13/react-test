import { useObservable } from '@mindspace-io/utils';
import { useContext } from 'react';
import { Comment } from '../../stores/comments/comment.model';
import { CommentsContext } from '../../stores/comments/comments.context';
import { ICommentsFacade } from '../../stores/comments/comments.facade';

export type CommentsHookTuple = [Comment[], ICommentsFacade];

/**
 * Custom Hook to manage a view Model for Comment view components
 */
export function useComments(): CommentsHookTuple {
  const commentsService = useContext(CommentsContext);

  const [comments] = useObservable(commentsService.entitie$, []);

  return [comments, commentsService];
}
