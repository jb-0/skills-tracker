import React from 'react';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';

function RegisterLogin() {
  return (
    <div className="social-login-buttons">
      <a href="/auth/facebook">
        <FacebookLoginButton>Sign up with Facebook</FacebookLoginButton>
      </a>
      <a href="/auth/google">
        <GoogleLoginButton>Sign up with Google</GoogleLoginButton>
      </a>
    </div>
  );
}

export default RegisterLogin;
