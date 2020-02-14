import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { useAuth } from '../../hooks/auth.hook';

export const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const [isAuthenticating, isAuthenticated] = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : isAuthenticating ? (
          <div className="d-flex align-items-center p-3 text-primary">
            <span>Authenticating...</span>
            <div
              className="spinner-border ml-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LANDING,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
