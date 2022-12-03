import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { blue } from '@mui/material/colors';

interface Props {
  text: string;
  icon: React.ReactNode;
}

const FeatureChip: React.FC<Props> = ({ text, icon }) => {
  return (
    <Box display="flex" gap={2} alignItems="center">
      <Box
        sx={{
          backgroundColor: blue['100'],
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
        }}
      >
        {icon}
      </Box>
      <Typography color="textSecondary">{text}</Typography>
    </Box>
  );
};

export default FeatureChip;
