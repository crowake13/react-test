import { createContext } from 'react';
import { User } from './user.model';

const PostUserContext = createContext<{
  user: User | null;
  isFetching: boolean;
}>({ user: null, isFetching: false });

export default PostUserContext;
