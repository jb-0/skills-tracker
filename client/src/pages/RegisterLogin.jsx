import React from 'react';
import './RegisterLogin.css'
import Button from '../components/common/Button'

function RegisterLogin() {
  async function facebookLogin() {
    window.open("http://localhost:4000/auth/facebook", "_self");
  }


  return (
    <div>
      <Button buttonText='Login with facebook' classNames='social-button' buttonAction={facebookLogin} />
      {/* <Button buttonText='Login with google' classNames='social-button' buttonAction='' /> */}
    </div>
  );
}

export default RegisterLogin;
