import { ID } from '../entities/entity.facade';

export interface Post {
  userId: ID;
  id: ID;
  title: string;
  body: string;
}
