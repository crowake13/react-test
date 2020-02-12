import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { useAuth } from '../../hooks/auth.hook';
import Spinner from '../shared/Spinner';

export const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const [isAuthenticating, isAuthenticated] = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : isAuthenticating ? (
          <Spinner />
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
