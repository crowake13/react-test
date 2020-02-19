import { ICredentials, SessionFacade } from './session.facade';

describe('<MyComponent />', () => {
  it('Should not be authenticated or authenticating on initialization', () => {
    const service = new SessionFacade();
    expect(service.isCurrentlyAuthenticating).toEqual(false);
    expect(service.isCurrentlyAuthenticated).toEqual(false);
  });

  const invalidCreds: ICredentials = {
    email: 'something@something.darkside',
    password: 'Pa55w0rd'
  };

  it('Should NOT be authenticated after login attempt with invalid creds', async () => {
    const service = new SessionFacade();
    const isAuthenticatedBeforeLogin = service.isCurrentlyAuthenticated;
    const isLoggingIn = service.login(invalidCreds);
    expect(service.isCurrentlyAuthenticating).toEqual(true);
    expect(service.isCurrentlyAuthenticated).toEqual(
      isAuthenticatedBeforeLogin
    );
    await isLoggingIn;
    expect(service.isCurrentlyAuthenticated).toEqual(false);
    expect(service.isCurrentlyAuthenticating).toEqual(false);
  });

  const validCreds: ICredentials = {
    email: process.env.REACT_APP_VALID_EMAIL ?? 'martian@machine.com',
    password: process.env.REACT_APP_VALID_PASSWORD ?? '1234'
  };

  it('Should be authenticated after login attempt with valid creds', async () => {
    const service = new SessionFacade();
    const isAuthenticatedBeforeLogin = service.isCurrentlyAuthenticated;
    const isLoggingIn = service.login(validCreds);
    expect(service.isCurrentlyAuthenticating).toEqual(true);
    expect(service.isCurrentlyAuthenticated).toEqual(
      isAuthenticatedBeforeLogin
    );
    await isLoggingIn;
    expect(service.isCurrentlyAuthenticated).toEqual(true);
    expect(service.isCurrentlyAuthenticating).toEqual(false);
  });

  it('Should NOT be authenticated after logout', async () => {
    const service = new SessionFacade();
    await service.login(validCreds);
    service.logout();
    expect(service.isCurrentlyAuthenticated).toEqual(false);
  });
});
