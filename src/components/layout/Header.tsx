import React from 'react';
import { Link } from 'react-router-dom';
import * as RENDER_LOG from '../../constants/render-log';
import * as ROUTES from '../../constants/routes';
import { useAuth } from '../../hooks/auth.hook';
import withRenderLog from '../shared/withRenderLog';

const Header = () => {
  const [, isAuthenticated] = useAuth();
  return (
    <header>
      <span>WELCOME :)</span>
      {!isAuthenticated ? null : <Link to={ROUTES.LANDING}>LOGOUT</Link>}
    </header>
  );
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(Header);
