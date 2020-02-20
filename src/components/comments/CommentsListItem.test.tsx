import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Comment } from '../../stores/comments/comment.model';
import { CommentListItem } from './CommentsListItem';

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

it('renders correctly', () => {
  const postId = 1;
  const comment: Comment = {
    postId,
    id: 1,
    name: 'title 1.1',
    email: 'email 1.1',
    body: 'body 1.1'
  };

  act(() => {
    render(<CommentListItem {...comment} hideTopBoarder={true} />, container);
  });
  expect(container?.innerHTML).toMatchSnapshot();

  act(() => {
    render(<CommentListItem {...comment} />, container);
  });
  expect(container?.innerHTML).toMatchSnapshot();
});
