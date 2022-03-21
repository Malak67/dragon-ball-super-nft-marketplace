import { Box } from '@mui/material';
import React, { FC } from 'react';
import { MintContainer, Hero, MintDetails, DBSCardList } from '../components';

export const Home: FC = () => {
  return (
    <div>
      <Hero />
      <Box sx={{ padding: '20px' }}>
        <MintDetails />
        <MintContainer />
        <DBSCardList />
      </Box>
    </div>
  );
};
