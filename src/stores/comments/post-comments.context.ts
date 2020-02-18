import { createContext } from 'react';
import { Comment } from './comment.model';

const context = createContext<{
  comments: Comment[] | null;
  areCommentsVisible: boolean;
  toggleCommentsVisibility: (newValue: boolean) => void;
} | null>(null);

export const { Provider, Consumer } = context;
