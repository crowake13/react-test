import React, { useContext } from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { useFetch } from '../../hooks/fetch.hook';
import { PostsContext } from '../../stores/posts/posts.context';
import withRenderLog from '../shared/withRenderLog';

const FetchAllPostsStatus = () => {
  const [isFetchingAll, hasEncounteredError, fetchPosts] = useFetch(
    useContext(PostsContext),
    'posts'
  );

  const fetchAllPosts = () => {
    fetchPosts(true);
  };

  return (
    <div>
      {isFetchingAll ? (
        <div className="d-flex align-items-center text-primary">
          <span>Loading posts...</span>
          <div
            className="spinner-border ml-auto"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      ) : hasEncounteredError ? (
        <div className="alert alert-danger m-3" role="alert">
          There was an issue while fetching all Posts
        </div>
      ) : (
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={fetchAllPosts}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  FetchAllPostsStatus
);
