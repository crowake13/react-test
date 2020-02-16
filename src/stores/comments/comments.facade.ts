import { EntityFacade, IEntityFacade } from '../entities/entity.facade';
import { Comment } from './comment.model';

export interface ICommentsFacade extends IEntityFacade<Comment> {
  fetchAll(): Promise<void>;
}

export class CommentsFacade extends EntityFacade<Comment> {
  async fetchAll() {
    await this.fetch('comments', true, 4500);
  }
}

export const facade = new CommentsFacade();
