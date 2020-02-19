import React from 'react';
import PostList from '../components/posts/PostList';
import PostsSearchTerm from '../components/posts/PostsSearchTerm';
import FetchAllStatus from '../components/shared/FetchAllStatus';
import withRenderLog from '../components/shared/withRenderLog';
import * as RENDER_LOG from '../constants/render-log';

const PostsPage = () => (
  <div className="mb-3">
    <div className="d-flex justify-content-between pt-3">
      <div className="w-50 mx-3">
        <PostsSearchTerm />
      </div>
      <div className="w-50 mx-3">
        <FetchAllStatus refreshOnInit={true} />
      </div>
    </div>
    <PostList />
  </div>
);

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostsPage);
