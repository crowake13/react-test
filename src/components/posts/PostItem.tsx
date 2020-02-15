import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as RENDER_LOG from '../../constants/render-log';
import { useComments } from '../../hooks/comments/comments.hook';
import { useUsers } from '../../hooks/users/users.hook';
import { Post } from '../../stores/posts/post.model';
import withRenderLog from '../shared/withRenderLog';
import './PostItem.css';

const PostItem = ({ userId, id, title, body }: Post) => {
  const [areCommentsVisible, toggleCommentsVisability] = useState(false);
  const [, usersService] = useUsers();
  const [comments] = useComments();

  const user = usersService.getById(userId);
  const filteredComments = comments.filter(comment => comment.postId === id);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/post/${id}`}>{title}</Link>
        </h5>
        {user ? (
          <h6 className="card-subtitle mb-2 text-muted">{user.name}</h6>
        ) : null}
        <p className="card-text">{body}</p>
        <Link className="card-link" to={`/post/${id}`}>
          Details
        </Link>
      </div>
      <div
        className={`bg-light border-top ${
          areCommentsVisible ? 'full-card-height' : ''
        }`}
      >
        <div className="card-header">
          <span>Comments</span>
          <button
            type="button"
            className="close float-right"
            aria-label="Close"
            onClick={() => toggleCommentsVisability(!areCommentsVisible)}
          >
            <span aria-hidden="true">
              {areCommentsVisible ? (
                <svg
                  className="bi bi-chevron-down"
                  width="1em"
                  height="1em"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.646 6.646a.5.5 0 01.708 0L10 12.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="bi bi-chevron-up"
                  width="1em"
                  height="1em"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.646 6.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L10 7.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </span>
          </button>
        </div>
        {areCommentsVisible ? (
          <div className="card-body m-0">
            {filteredComments.map((comment, index) => (
              <div
                key={comment.id}
                className={!index ? 'mb-2' : 'border-top mb-2'}
              >
                <h6 className="card-subtitle my-2 text-muted">
                  {comment.email}
                </h6>
                <h5 className="card-title">{comment.name}</h5>
                <p className="card-text">{comment.body}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostItem);
