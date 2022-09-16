import React from "react";
import styled from "styled-components/macro";
import Profile from "./Profile";

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const Welcome = ({ token, profile }) => {
  const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://spoti-spy.herokuapp.com/login';

  return (
    <>
      {!token ? (
        <StyledLoginContainer>
          <StyledLoginButton href={LOGIN_URI}>
            Log in to SpotiSpy
          </StyledLoginButton>
        </StyledLoginContainer>
      ) : (
        <>{profile && <Profile />}</>
      )}
    </>
  );
};

export default Welcome;
