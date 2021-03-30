import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export interface AuthenticationBarProps {
  isSignIn: boolean;
}

const Bar = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.1);
  flex: 1;
  width: 100%;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 20px;
  color: #666;
  font-weight: bold;
  text-decoration: none;

  :hover {
    color: #000;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const StyledLinkActive = styled(StyledLink)`
  color: #000;
  background: rgba(0, 0, 0, 0.2);
`;

export const AuthenticationBar: React.FC<AuthenticationBarProps> = ({
  isSignIn,
}) => {
  if (isSignIn) {
    return (
      <Bar>
        <StyledLinkActive to="/">Sign in</StyledLinkActive>
        <StyledLink to="/signup">Sign up</StyledLink>
      </Bar>
    );
  }

  return (
    <Bar>
      <StyledLink to="/">Sign in</StyledLink>
      <StyledLinkActive to="/signup">Sign up</StyledLinkActive>
    </Bar>
  );
};
