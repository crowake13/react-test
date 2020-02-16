import { EntityFacade, ID, IEntityFacade } from '../entities/entity.facade';
import { Post } from './post.model';

export interface IPostsFacade extends IEntityFacade<Post> {
  fetchAll(): Promise<void>;
  fetchById(id: ID): Promise<void>;
}

export class PostsFacade extends EntityFacade<Post> implements IPostsFacade {
  async fetchAll() {
    await this.fetch('posts', true, 1500);
  }

  async fetchById(id: ID) {
    await this.fetch(`posts/${id}`, false, 1500);
  }
}

export const facade = new PostsFacade();
