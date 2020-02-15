import { EntityFacade, IEntityFacade } from '../entities/entity.facade';
import { User } from './user.model';

export interface IUsersFacade extends IEntityFacade<User> {
  fetchAll(): Promise<void>;
}

export class UsersFacade extends EntityFacade<User> implements IUsersFacade {
  async fetchAll() {
    await this.fetch('users', true);
  }
}

export const facade = new UsersFacade();
