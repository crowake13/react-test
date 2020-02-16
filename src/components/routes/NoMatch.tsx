import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as RENDER_LOG from '../../constants/render-log';
import * as ROUTES from '../../constants/routes';
import withRenderLog from '../shared/withRenderLog';

const NoMatch = () => {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
      <p>
        Go to main screen by clicking <Link to={ROUTES.APP}>HERE</Link>
      </p>
    </div>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(NoMatch);
