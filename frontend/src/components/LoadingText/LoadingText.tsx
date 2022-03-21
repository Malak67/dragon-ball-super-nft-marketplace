import React, { FC } from 'react';
import { Paper, CircularProgress, Typography } from '@mui/material';
import loading from '../../assets/loading.gif';

export const LoadingText: FC<{ text: string }> = ({ text }) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        margin: '20px 0',
      }}
    >
      <CircularProgress color='secondary' />
      <img src={loading} alt='loading' />
      <Typography variant='h4' color='secondary' mb={3}>
        {text || 'Loading...'}
      </Typography>
    </Paper>
  );
};
