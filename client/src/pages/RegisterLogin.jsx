import React from 'react';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import './RegisterLogin.css'

function RegisterLogin() {
  return (
    <div className="social-login-buttons">
      <div className="social-login-button">
        <a href="/auth/facebook">
          <FacebookLoginButton>Log in / Sign up with Facebook</FacebookLoginButton>
        </a>
      </div>
      <div className="social-login-button">
        <a href="/auth/google">
          <GoogleLoginButton>Log in / Sign up with Google</GoogleLoginButton>
        </a>
      </div>
    </div>
  );
}

export default RegisterLogin;
