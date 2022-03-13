import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

export const PageNotFound: FC = () => {
  return (
    <Box
      mt={5}
      sx={{
        display: 'flex',
        justifyItems: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
      }}
    >
      <Typography variant='h2'>404</Typography>
      <Typography variant='h4'>Page not found!</Typography>
      <Link to={'/'}>
        <Typography variant='h4' color='primary'>
          Go back home
        </Typography>
      </Link>
    </Box>
  );
};
