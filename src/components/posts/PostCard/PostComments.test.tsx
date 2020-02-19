import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { of } from 'rxjs';
import CommentsFacadeProvider from '../../comments/CommentsFacadeProvider';
import PostCommentsProvider from '../../comments/PostCommentsProvider';
import PostComments from './PostComments';

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
const entitie$ = of([
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
]);

it('renders comments on init', () => {
  act(() => {
    render(
      <CommentsFacadeProvider entitie$={entitie$}>
        <PostCommentsProvider postId={postId} areCommentsVisibleOnInit={true}>
          <PostComments
            loadingCommentsLabel="Comments are loading..."
            noCommentsLabel="There are no comments"
          />
        </PostCommentsProvider>
      </CommentsFacadeProvider>,
      container
    );
  });
  expect(container?.innerHTML).toMatchSnapshot();
});

it('renders comments after clicking visibility toggle', () => {
  act(() => {
    render(
      <CommentsFacadeProvider entitie$={entitie$}>
        <PostCommentsProvider postId={postId}>
          <PostComments
            loadingCommentsLabel="Comments are loading..."
            noCommentsLabel="There are no comments"
          />
        </PostCommentsProvider>
      </CommentsFacadeProvider>,
      container
    );
  });
  expect(container?.innerHTML).toMatchSnapshot();

  const button: HTMLButtonElement | null =
    container?.querySelector('button.close.float-right') ?? null;

  act(() => {
    button?.click();
  });
  expect(
    container
      ?.querySelector('.bg-light.border-top')
      ?.classList.contains('full-card-height')
  ).toBe(true);
  expect(container?.innerHTML).toMatchSnapshot();
});
