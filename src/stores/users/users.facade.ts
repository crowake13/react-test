import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EntityFacade, ID, IEntityFacade } from '../entities/entity.facade';
import { User, UserProps } from './user.model';

export interface IUsersFacade extends IEntityFacade<User> {
  searchTerm: string;
  searchTerm$: Observable<string>;
  getFilteredUsers(
    users: User[],
    searchTerm: string,
    propsToSearch: UserProps[]
  ): User[];
  updateSearchTerm(searchTerm: string): void;
  fetchAll(): Promise<void>;
  fetchById(id: ID): Promise<void>;
}

export class UsersFacade extends EntityFacade<User> implements IUsersFacade {
  private _searchTerm$ = new BehaviorSubject<string>('');
  readonly searchTerm$ = this._searchTerm$
    .asObservable()
    .pipe(debounceTime(300), distinctUntilChanged());

  get searchTerm() {
    return this._searchTerm$.getValue();
  }

  getFilteredUsers(
    users: User[],
    searchTerm: string,
    propsToSearch: UserProps[]
  ) {
    return users.filter(
      user =>
        propsToSearch
          .reduce((acc, prop) => {
            const value = user[prop];

            if (typeof value === 'string') {
              return `${acc} ${value}`;
            }

            return acc;
          }, '')
          .trim()
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase()) !== -1
    );
  }

  updateSearchTerm(searchTerm: string) {
    this._searchTerm$.next(searchTerm);
  }

  async fetchAll() {
    await this.fetch('users', true, 3000);
  }

  async fetchById(id: ID) {
    await this.fetch(`users/${id}`, false, 1500);
  }
}

export const facade = new UsersFacade();
