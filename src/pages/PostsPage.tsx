import React, { useContext, useEffect } from 'react';
import FetchAllPostsStatus from '../components/posts/FetchAllPostsStatus';
import PostList from '../components/posts/PostList';
import withRenderLog from '../components/shared/withRenderLog';
import * as RENDER_LOG from '../constants/render-log';
import { CommentsContext } from '../stores/comments/comments.context';
import { PostsContext } from '../stores/posts/posts.context';
import { UsersContext } from '../stores/users/users.context';

const PostsPage = () => {
  const usersService = useContext(UsersContext);
  const postsService = useContext(PostsContext);
  const commentsService = useContext(CommentsContext);

  useEffect(() => {
    usersService.fetchAll();
  }, [usersService]);

  useEffect(() => {
    postsService.fetchAll();
  }, [postsService]);

  useEffect(() => {
    commentsService.fetchAll();
  }, [commentsService]);

  return (
    <div className="mb-3">
      <div className="pt-3">
        <div className="mx-3 mb-3">
          <FetchAllPostsStatus />
        </div>
      </div>
      <PostList />
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostsPage);
