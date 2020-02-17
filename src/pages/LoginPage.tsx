import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import withRenderLog from '../components/shared/withRenderLog';
import * as RENDER_LOG from '../constants/render-log';
import * as ROUTES from '../constants/routes';
import { useAuth } from '../hooks/auth.hook';
import { ICredentials } from '../stores/session/session.facade';

interface IFrom {
  pathname: string;
}

const LoginPage = ({ getDefaultFrom }: { [key: string]: any }) => {
  const [, , login, logout] = useAuth();
  const history = useHistory();
  const location = useLocation();
  const from = getDefaultFrom(location.state);

  const onSubmit = async (creds: ICredentials) => {
    history.push(from);
    await login(creds);
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="d-flex justify-content-center mt-5">
      <button
        className="btn btn-primary"
        onClick={() => onSubmit({ email: 'blabla', password: 'asdf' })}
      >
        Login
      </button>
    </div>
  );
};

LoginPage.defaultProps = {
  getDefaultFrom({ from }: { from?: IFrom } = {}): IFrom {
    if (!from || from.pathname === ROUTES.LANDING) {
      return { pathname: ROUTES.APP };
    }

    return from;
  }
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(LoginPage);
