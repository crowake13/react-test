import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BehaviorSubject, Subject } from 'rxjs';
import { ID } from '../../../stores/entities/entity.facade';
import { User } from '../../../stores/users/user.model';
import PostUserProvider from '../../users/PostUserProvider';
import UsersFacadeProvider from '../../users/UsersFacadeProvider';
import PostUser from './PostUser';

let container: HTMLElement | null = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  if (!container) {
    return;
  }

  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const users: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: -37.3159,
        lng: 81.1496
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  }
];

it('renders PostUser manually', () => {
  const _entitie$ = new BehaviorSubject<User[]>([]);
  const entitie$ = _entitie$.asObservable();

  const _isFetching$ = new Subject<{ [key: string]: boolean }>();
  const isFetching$ = _isFetching$.asObservable();

  const setIsFetching = (value: boolean, slug: string = 'users') => {
    _isFetching$.next({
      [slug]: value
    });
  };

  const getById = (id: ID) => {
    return _entitie$.getValue().filter(entity => entity.id === id)[0] ?? null;
  };

  act(() => {
    render(
      <UsersFacadeProvider
        entitie$={entitie$}
        isFetching$={isFetching$}
        getById={getById}
      >
        <PostUserProvider id={users[0].id} slug="users">
          <PostUser
            loadingUserLabel="Author is loading..."
            noUserLabel="Author could not be found!"
          />
        </PostUserProvider>
      </UsersFacadeProvider>,
      container
    );
    setIsFetching(false);
  });
  expect(container?.innerHTML).toMatchSnapshot();

  act(() => {
    setIsFetching(true);
  });

  expect(container?.innerHTML).toMatchSnapshot();

  act(() => {
    _entitie$.next(users);
    setIsFetching(false);
  });

  expect(container?.innerHTML).toMatchSnapshot();
});
