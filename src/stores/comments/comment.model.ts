import { ID } from '../entities/entity.facade';

export interface Comment {
  postId: ID;
  id: ID;
  name: string;
  email: string;
  body: string;
}
