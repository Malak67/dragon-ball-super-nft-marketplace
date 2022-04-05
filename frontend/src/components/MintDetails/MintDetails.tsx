import React, { FC } from 'react';
import { formatUnits } from '@ethersproject/units';
import { Box, Paper, Typography } from '@mui/material';
import { useToken, useTokenBalance } from '@usedapp/core';
import { ledgerAddress, tokenAddress } from '../../constants';
import { useMintedCount, useMintPrice } from '../../hooks';
import gokuBlue from '../../assets/gokuBlue.png';
import dragonBall from '../../assets/4star.png';
import { useStyles } from './MintDetails.styles';

export const MintDetails: FC = () => {
  const mintPrice = useMintPrice();
  const mintedCount = useMintedCount();
  const dbsTokenInfo = useToken(tokenAddress);
  const dbsBalance = useTokenBalance(tokenAddress, ledgerAddress);
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      {mintPrice && (
        <Typography>
          Mint Price(+1%/tx): {formatUnits(mintPrice, 18)}{' '}
          {dbsTokenInfo?.symbol}
        </Typography>
      )}
      {dbsBalance && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            alignItems: 'center',
          }}
        >
          <img src={gokuBlue} width='40px' alt='logo' />
          <Typography>
            Raised: {formatUnits(dbsBalance, 18)} {dbsTokenInfo?.symbol}
          </Typography>
          <img src={dragonBall} width='40px' alt='logo' />
        </Box>
      )}
      {!!mintedCount && (
        <Typography>Minted DBS Cards: {mintedCount.toString()}</Typography>
      )}
    </Paper>
  );
};
