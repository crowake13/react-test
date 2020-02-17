import { useObservable } from '@mindspace-io/utils';
import { useContext } from 'react';
import { Comment } from '../../stores/comments/comment.model';
import { CommentsContext } from '../../stores/comments/comments.context';
import { ID } from '../../stores/entities/entity.facade';

export type CommentsHookTuple = [Comment[], (postId: ID) => Comment[] | null];

/**
 * Custom Hook to manage a view Model for Comment view components
 */
export const useComments = (): CommentsHookTuple => {
  const commentsService = useContext(CommentsContext);

  const [comments] = useObservable(commentsService.entitie$, []);

  const mapOfPostComments = new Map<string, Comment[]>();

  comments.forEach(comment => {
    const postComments = mapOfPostComments.get(`${comment.postId}`);

    mapOfPostComments.set(
      `${comment.postId}`,
      postComments ? postComments.concat(comment) : [comment]
    );
  });

  return [comments, (postId: ID) => mapOfPostComments.get(`${postId}`) ?? null];
};
