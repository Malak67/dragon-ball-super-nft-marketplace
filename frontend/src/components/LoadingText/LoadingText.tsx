import React, { FC } from 'react';
import { Paper, CircularProgress, Typography } from '@mui/material';

export const LoadingText: FC<{ text: string }> = ({ text }) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
      <Typography color='primary'>{text || 'Loading'}</Typography>
    </Paper>
  );
};
