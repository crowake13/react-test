import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Subject } from 'rxjs';
import { Comment } from '../../../stores/comments/comment.model';
import CommentsFacadeProvider from '../../comments/CommentsFacadeProvider';
import PostCommentsProvider from '../../comments/PostCommentsProvider';
import PostDetailsComments from './PostDetailsComments';

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

const postId = 1;

const comments: Comment[] = [
  {
    postId,
    id: 1,
    name: 'title 1.1',
    email: 'email 1.1',
    body: 'body 1.1'
  },
  {
    postId,
    id: 2,
    name: 'title 1.2',
    email: 'email 1.2',
    body: 'body 1.2'
  }
];

it('renders PostDetailsComments manually', () => {
  const _entitie$ = new Subject<Comment[]>();
  const entitie$ = _entitie$.asObservable();

  const _isFetching$ = new Subject<{ [key: string]: boolean }>();
  const isFetching$ = _isFetching$.asObservable();

  const setIsFetching = (value: boolean, slug: string = 'comments') => {
    _isFetching$.next({
      [slug]: value
    });
  };

  act(() => {
    render(
      <CommentsFacadeProvider entitie$={entitie$} isFetching$={isFetching$}>
        <PostCommentsProvider postId={postId}>
          <PostDetailsComments
            loadingCommentsLabel="Comments are loading..."
            noCommentsLabel="There are no comments"
          />
        </PostCommentsProvider>
      </CommentsFacadeProvider>,
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
    _entitie$.next(comments);
    setIsFetching(false);
  });

  expect(container?.innerHTML).toMatchSnapshot();
});
