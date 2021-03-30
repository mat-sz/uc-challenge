import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export interface AuthenticationBarProps {
  isSignIn: boolean;
}

export const AuthenticationBar: React.FC<AuthenticationBarProps> = ({
  isSignIn,
}) => {
  return (
    <div>
      <Link to="/">Sign in</Link>
      <Link to="/signup">Sign up</Link>
    </div>
  );
};
