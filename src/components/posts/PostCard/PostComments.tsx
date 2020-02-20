import React, { useContext } from 'react';
import * as RENDER_LOG from '../../../constants/render-log';
import PostCommentsContext from '../../../stores/comments/post-comments.context';
import { CommentList } from '../../comments/CommentsList';
import withRenderLog from '../../shared/withRenderLog';

interface PostCommentsProps {
  loadingCommentsLabel: string;
  noCommentsLabel: string;
}

const PostComments = ({
  loadingCommentsLabel,
  noCommentsLabel
}: PostCommentsProps) => {
  const { areCommentsVisible, comments, toggleCommentsVisibility } = useContext(
    PostCommentsContext
  );

  const headerTitle = !comments
    ? loadingCommentsLabel
    : !comments.length
    ? noCommentsLabel
    : `Comments (${comments.length})`;

  return (
    <div
      className={`post-comments-container bg-light border-top ${
        areCommentsVisible ? 'full-card-height' : ''
      }`}
    >
      <div className="card-header">
        <div title={headerTitle} className="card-header-title">
          {headerTitle}
        </div>
        {!comments || !comments.length ? null : (
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => toggleCommentsVisibility(!areCommentsVisible)}
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
        )}
      </div>
      {areCommentsVisible && comments && comments.length ? (
        <CommentList comments={comments} />
      ) : null}
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(PostComments);
