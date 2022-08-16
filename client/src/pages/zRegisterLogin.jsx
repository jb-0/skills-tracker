import { Button } from '@mui/material';
import React from 'react';
import { SocialLoginSection } from './RegisterLogin.Styles';

function RegisterLogin() {
  return (
    <SocialLoginSection>
      <a href="/auth/facebook">
        <Button>Log in / Sign up with Facebook</Button>
      </a>
      <a href="/auth/google">
        <Button>Log in / Sign up with Google</Button>
      </a>
    </SocialLoginSection>
  );
}

export default RegisterLogin;
