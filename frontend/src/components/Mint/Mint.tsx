import React, { FC } from 'react';
import { Box } from '@mui/material';
import { DBSCard } from '../DBSCard';
import { useMintEffects } from './Mint.effects';

export const Mint: FC = () => {
  const dbsCard = useMintEffects();

  return <Box>{dbsCard && <DBSCard {...dbsCard} />}</Box>;
};
