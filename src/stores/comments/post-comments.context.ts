import { createContext } from 'react';
import { Comment } from './comment.model';

const PostCommentsContext = createContext<{
  comments: Comment[] | null;
  areCommentsVisible: boolean;
  toggleCommentsVisibility: (newValue: boolean) => void;
}>({
  comments: null,
  areCommentsVisible: false,
  toggleCommentsVisibility: newValue => console.log(newValue)
});

export default PostCommentsContext;
