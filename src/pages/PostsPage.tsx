import React from 'react';
import withRenderLog from '../components/shared/withRenderLog';
import * as RENDER_LOG from '../constants/render-log';

const PostsPage = () => <div>posts</div>;

export default process.env.NODE_ENV === 'production'
  ? PostsPage
  : withRenderLog({ greeting: RENDER_LOG.GREETING })(PostsPage);
