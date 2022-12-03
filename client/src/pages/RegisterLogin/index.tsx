import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const RegisterLogin: React.FunctionComponent = () => {
  const containerPadding = 4;
  const containerTopPadding = 6;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent={{ xs: "flex-start", sm: "space-around" }}
      alignItems={{ xs: "center", sm: "flex-start" }}
      width="100%"
      height="100%"
      p={containerPadding}
      pt={containerTopPadding}
      gap={4}
    >
      <Box display="flex" flexDirection="column" width="fit-content">
        <Typography variant="h5" pb={2}>
          Sign in
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/auth/facebook"
          sx={{ mb: 2 }}
        >
          Log in with Facebook
        </Button>
        <Button variant="contained" size="large" href="/auth/google">
          Log in with Google
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" width="fit-content">
        <Typography variant="h5" pb={2}>
          Register{" "}
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/auth/facebook"
          sx={{ mb: 2 }}
        >
          Sign up with Facebook
        </Button>
        <Button variant="contained" size="large" href="/auth/google">
          Sign up with Google
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterLogin;
