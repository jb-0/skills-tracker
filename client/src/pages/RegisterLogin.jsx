import React from 'react';
import './RegisterLogin.css'
import Button from '../components/common/Button'

function RegisterLogin() {
  return (
    <div>
      <Button buttonText='Login with facebook' classNames='social-button' buttonAction='' />
      <Button buttonText='Login with google' classNames='social-button' buttonAction='' />
    </div>
  );
}

export default RegisterLogin;
