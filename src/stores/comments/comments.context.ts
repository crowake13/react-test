import { createContext } from 'react';
import { facade, ICommentsFacade } from './comments.facade';

export const CommentsContext = createContext<ICommentsFacade>(facade);
