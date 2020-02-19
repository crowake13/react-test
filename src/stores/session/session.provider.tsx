import React, { createContext, Dispatch, useReducer } from 'react';

export enum AUTH_ACTIONS {
  START_AUTH = 'START_AUTH',
  END_AUTH = 'END_AUTH',
  LOGOUT = 'LOGOUT'
}

interface ISessionState {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  accessToken: string;
}

const authInitialState: ISessionState = {
  isAuthenticating: false,
  isAuthenticated: false,
  accessToken: ''
};

const authReducer = (
  state: ISessionState,
  action: { type: string; payload?: any }
): ISessionState => {
  switch (action.type) {
    case AUTH_ACTIONS.START_AUTH:
      return {
        ...state,
        isAuthenticating: true
      };
    case AUTH_ACTIONS.END_AUTH:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: !!action.payload,
        accessToken: action.payload ?? ''
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        accessToken: ''
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<
  [ISessionState, Dispatch<{ type: string; payload?: any }>]
>([
  authInitialState,
  ({ type }) => {
    console.log(type);
  }
]);

export const AuthProvider = ({
  reducer,
  initialState,
  children
}: {
  reducer?: (
    state: ISessionState,
    action: { type: string; payload?: any }
  ) => ISessionState;
  initialState?: ISessionState;
  children: any;
}) => (
  <AuthContext.Provider
    value={useReducer(reducer ?? authReducer, initialState ?? authInitialState)}
  >
    {children}
  </AuthContext.Provider>
);
