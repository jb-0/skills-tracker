import * as React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loader: React.FunctionComponent = () => {
  return (
    <Box color="secondary" display="flex" height="100%" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Box>
  );
};

export default Loader;
