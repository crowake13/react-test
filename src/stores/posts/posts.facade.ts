import { EntityFacade, IEntityFacade } from '../entities/entity.facade';
import { Post } from './post.model';

export interface IPostsFacade extends IEntityFacade<Post> {
  fetchAll(): Promise<void>;
}

export class PostsFacade extends EntityFacade<Post> implements IPostsFacade {
  async fetchAll() {
    await this.fetch('posts', true);
  }
}

export const facade = new PostsFacade();
