import React, { FC } from 'react';
import { Box } from '@mui/material';
import { useDBSCardContainerEffects } from './DBSCardContainer.effects';
import { DBSCard } from '../DBSCard';

export const DBSCardContainer: FC<{ tokenIndex: number }> = ({
  tokenIndex,
}) => {
  const dbsCard = useDBSCardContainerEffects(tokenIndex);
  return <Box>{dbsCard && <DBSCard {...dbsCard} />}</Box>;
};
