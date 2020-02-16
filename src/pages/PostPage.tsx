import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostDetails from '../components/posts/PostDetails';
import withRenderLog from '../components/shared/withRenderLog';
import * as RENDER_LOG from '../constants/render-log';
import { CommentsContext } from '../stores/comments/comments.context';
import { PostsContext } from '../stores/posts/posts.context';

const PostPage = () => {
  let { id } = useParams();
  const postsService = useContext(PostsContext);
  const commentsService = useContext(CommentsContext);

  useEffect(() => {
    const fetchById = async (postId: string) => {
      await postsService.fetchById(postId);
      postsService.activate(postId);
    };

    if (!id) {
      throw new Error(
        'The post ID in the url params has no value. This should never happen!'
      );
    }

    if (!postsService.getById(id)) {
      fetchById(id);
    } else {
      postsService.activate(id);
    }
  }, [id, postsService]);

  useEffect(() => {
    commentsService.fetch(`posts/${id}/comments`, false, 4500);
  }, [id, commentsService]);

  return <PostDetails />;
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostPage);
