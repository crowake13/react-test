import React, { useRef, useState } from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { useUsersSearchTerm } from '../../hooks/users/users-search-term.hook';
import withRenderLog from '../shared/withRenderLog';

const PostsSearchTerm = () => {
  const [searchTerm, setSearchTerm] = useUsersSearchTerm();
  const [value, setValue] = useState(searchTerm);
  const inputRef = useRef<any>();

  const updateSearchTerm = (newInputValue: string) => {
    setValue(newInputValue);
    setSearchTerm(newInputValue);
    inputRef.current.focus();
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Search by author"
          ref={inputRef}
          value={value}
          onChange={e => updateSearchTerm(e.target.value)}
        />
        {!value ? null : (
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => updateSearchTerm('')}
            >
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(
  PostsSearchTerm
);
