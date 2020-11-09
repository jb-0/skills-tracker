import React from 'react';
import './RegisterLogin.css'
import Button from '../components/common/Button'

function RegisterLogin() {
  return (
    <div>
      <a href="/auth/facebook">
        <Button
          buttonText="Login with Facebook"
          classNames="social-button"
        />
      </a>

      <a href="/auth/google">
        <Button
          buttonText="Login with Google"
          classNames="social-button"
        />
      </a>
    </div>
  );
}

export default RegisterLogin;
