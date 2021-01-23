import React from 'react';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { SocialLoginSection } from './RegisterLogin.Styles';

function RegisterLogin() {
  return (
    <SocialLoginSection>
      <a href="/auth/facebook">
        <FacebookLoginButton>Log in / Sign up with Facebook</FacebookLoginButton>
      </a>
      <a href="/auth/google">
        <GoogleLoginButton>Log in / Sign up with Google</GoogleLoginButton>
      </a>
    </SocialLoginSection>
  );
}

export default RegisterLogin;
