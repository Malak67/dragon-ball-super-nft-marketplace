import { Box } from '@mui/material';
import React, { FC } from 'react';
import { useDBSCardListEffects } from './DBSCardList.effects';

export const DBSCardList: FC = () => {
  const { mintedCount } = useDBSCardListEffects();
  return <Box>Mint List</Box>;
};
