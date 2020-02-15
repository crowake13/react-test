import { createContext } from 'react';
import { facade, IPostsFacade } from './posts.facade';

export const PostsContext = createContext<IPostsFacade>(facade);
