import React from 'react';
import { useParams } from 'react-router-dom';
import withRenderLog from '../components/shared/withRenderLog';
import * as RENDER_LOG from '../constants/render-log';

const PostPage = () => {
  let { id } = useParams();

  return <div>post id: {id}</div>;
};

export default process.env.NODE_ENV === 'production'
  ? PostPage
  : withRenderLog({ greeting: RENDER_LOG.GREETING })(PostPage);
