import { EntityFacade, ID, IEntityFacade } from '../entities/entity.facade';
import { User } from './user.model';

export interface IUsersFacade extends IEntityFacade<User> {
  fetchAll(): Promise<void>;
  fetchById(id: ID): Promise<void>;
}

export class UsersFacade extends EntityFacade<User> implements IUsersFacade {
  async fetchAll() {
    await this.fetch('users', true, 3000);
  }

  async fetchById(id: ID) {
    await this.fetch(`users/${id}`, false, 1500);
  }
}

export const facade = new UsersFacade();
