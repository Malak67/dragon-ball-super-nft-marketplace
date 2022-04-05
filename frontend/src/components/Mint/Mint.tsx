import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { DBSCard } from '../DBSCard';
import { useMintEffects } from './Mint.effects';

export const Mint: FC = () => {
  const dbsCard = useMintEffects();
  return (
    <Box>
      {dbsCard && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant='h3' color="primary">
            Congrats! You are now part of our community!
          </Typography>
          <DBSCard {...dbsCard} />
        </Box>
      )}
    </Box>
  );
};
