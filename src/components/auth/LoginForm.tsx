import React, { useRef, useState } from 'react';
import { ICredentials } from '../../stores/session/session.facade';

export interface ILoginFromProps {
  onSubmit(creds: ICredentials): void;
}

export const LoginFrom = ({ onSubmit }: ILoginFromProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState('');

  return (
    <form autoComplete="off" onSubmit={() => onSubmit({ email, password })}>
      <input type="password" name="password" style={{ display: 'none' }} />
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          autoComplete="off"
          value={email}
          ref={emailRef}
          required
          placeholder={process.env.REACT_APP_VALID_EMAIL}
          className="form-control"
          onChange={event => setEmail(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          autoComplete="off"
          value={password}
          ref={passwordRef}
          required
          className="form-control"
          placeholder={process.env.REACT_APP_VALID_PASSWORD}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button type="submit" className="mt-3 w-100 btn btn-primary">
        Login
      </button>
    </form>
  );
};
