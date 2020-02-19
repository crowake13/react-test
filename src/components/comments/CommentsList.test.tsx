import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Comment } from '../../stores/comments/comment.model';
import { CommentList } from './CommentsList';

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

it('renders with or without a name', () => {
  const postId = 1;
  const comments: Comment[] = [];

  act(() => {
    render(<CommentList comments={comments} />, container);
  });
  expect(container?.innerHTML).toMatchSnapshot();

  comments.push({
    postId,
    id: 1,
    name: 'title 1.1',
    email: 'email 1.1',
    body: 'body 1.1'
  });

  act(() => {
    render(<CommentList comments={comments} />, container);
  });
  expect(container?.innerHTML).toMatchSnapshot();

  comments.push({
    postId,
    id: 2,
    name: 'title 1.2',
    email: 'email 1.2',
    body: 'body 1.2'
  });

  act(() => {
    render(<CommentList comments={comments} />, container);
  });
  expect(container?.innerHTML).toMatchSnapshot();
});
