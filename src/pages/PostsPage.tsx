import React from 'react';
import withRenderLog from '../components/shared/withRenderLog';
import * as RENDER_LOG from '../constants/render-log';

const PostsPage = () => <div>posts</div>;

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostsPage);
