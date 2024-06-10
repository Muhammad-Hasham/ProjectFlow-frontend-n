import React from 'react';
import styled from 'styled-components';
import { GoogleLogin } from 'react-google-login';

const clientId = process.env.REACT_APP_CLIENT_ID;

function Login() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <Logo
          src="https://www.gstatic.com/images/icons/material/product/2x/docs_48dp.png"
          alt="Google Logo"
        />
        <Title>Sign in to Google</Title>
        <Subtitle>To create a Google Document</Subtitle>
        <StyledGoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 50px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  height: 80px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 20px 0;
  color: #333;
  font-size: 24px;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 30px;
`;

const StyledGoogleLogin = styled(GoogleLogin)`
  margin-top: 20px;
  button {
    text-transform: none !important;
    background-color: #4285f4 !important;
    color: white !important;
    &:hover {
      background-color: #357ae8 !important;
    }
  }
`;
