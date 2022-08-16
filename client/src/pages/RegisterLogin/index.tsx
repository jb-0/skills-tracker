import * as React from 'react';
import { Box, Button } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

const RegisterLogin: React.FunctionComponent = () => {
  const containerPadding = 4;
  const containerTopPadding = 6;

  return (
    <Box
      bgcolor={blueGrey[800]}
      display="flex"
      justifyContent="center"
      width="100%"
      height="100%"
      p={containerPadding}
      pt={containerTopPadding}
    >
      <Box display="flex" flexDirection="column" width="fit-content">
        <Button variant="contained" size="large" href="/auth/facebook" sx={{ mb: 2 }}>
          Log in / Sign up with Facebook
        </Button>
        <Button variant="contained" size="large" href="/auth/google">
          Log in / Sign up with Google
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterLogin;
