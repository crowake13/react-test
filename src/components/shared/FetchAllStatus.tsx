import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import { useFetchAll } from '../../hooks/fetch-all.hook';
import withRenderLog from './withRenderLog';

const FetchAllStatus = () => {
  const [isFetching, fetchAll] = useFetchAll();

  return (
    <div>
      {isFetching ? (
        <div className="d-flex align-items-center text-primary">
          <span>Loading...</span>
          <div
            className="spinner-border ml-auto"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      ) : (
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-primary" onClick={fetchAll}>
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(FetchAllStatus);
