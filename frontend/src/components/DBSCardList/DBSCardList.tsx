import { Box, Paper, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useMintedCount } from '../../hooks';
import { DBSCardContainer } from '../DBSCardContainer';

export const DBSCardList: FC = () => {
  const mintedCount = useMintedCount();

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        margin: '20px 0',
      }}
    >
      {!mintedCount?.toNumber() ? (
        <Typography>There are no DBS cards minted yet</Typography>
      ) : (
        Array.from(Array(mintedCount?.toNumber()).keys()).map(
          (tokenIndex: number) => {
            return (
              <Box key={`dbs-card-container-${tokenIndex}`}>
                <DBSCardContainer tokenIndex={tokenIndex} />
              </Box>
            );
          }
        )
      )}
    </Paper>
  );
};
