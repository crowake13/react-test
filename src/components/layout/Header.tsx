import React from 'react';
import { Link } from 'react-router-dom';
import * as RENDER_LOG from '../../constants/render-log';
import * as ROUTES from '../../constants/routes';
import { useAuth } from '../../hooks/auth.hook';
import withRenderLog from '../shared/withRenderLog';
import './Header.css';

const Header = () => {
  const [, isAuthenticated] = useAuth();

  return (
    <header>
      {isAuthenticated ? (
        <div className="clearfix p-3 border-bottom">
          <Link className="float-left" to={ROUTES.APP}>
            HOME
          </Link>
          <Link className="float-right" to={ROUTES.LANDING}>
            LOGOUT
          </Link>
        </div>
      ) : null}
    </header>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(Header);
