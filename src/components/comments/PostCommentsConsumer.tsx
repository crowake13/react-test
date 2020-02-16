import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { Consumer } from '../../stores/comments/post-comments.context';
import withRenderLog from '../shared/withRenderLog';
import { CommentList } from './CommentsList';

const PostCommentsConsumer = ({
  loadingCommentsLabel,
  noCommentsLabel
}: any) => {
  return (
    <Consumer>
      {context =>
        !context ? null : (
          <div
            className={`bg-light border-top ${
              context.areCommentsVisible ? 'full-card-height' : ''
            }`}
          >
            <div className="card-header">
              {!context.comments ? (
                loadingCommentsLabel
              ) : !context.comments.length ? (
                noCommentsLabel
              ) : (
                <>
                  <span>Comments ({context.comments.length})</span>
                  <button
                    type="button"
                    className="close float-right"
                    aria-label="Close"
                    onClick={() =>
                      context.toggleCommentsVisability(
                        !context.areCommentsVisible
                      )
                    }
                  >
                    <span aria-hidden="true">
                      {context.areCommentsVisible ? (
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
                </>
              )}
            </div>
            {context.areCommentsVisible ? (
              <CommentList comments={context.comments} />
            ) : null}
          </div>
        )
      }
    </Consumer>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  PostCommentsConsumer
);
