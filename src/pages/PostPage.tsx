import React from 'react';
import { useParams } from 'react-router-dom';

export const PostPage = () => {
  let { id } = useParams();

  return <div>post id: {id}</div>;
};
