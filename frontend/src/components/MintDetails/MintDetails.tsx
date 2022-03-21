import React, { FC } from 'react';
import { formatUnits } from '@ethersproject/units';
import { Paper, Typography } from '@mui/material';
import { useToken, useTokenBalance } from '@usedapp/core';
import { ledgerAddress, tokenAddress } from '../../constants';
import { useMintedCount, useMintPrice } from '../../hooks';

export const MintDetails: FC = () => {
  const mintPrice = useMintPrice();
  const mintedCount = useMintedCount();
  const dbsTokenInfo = useToken(tokenAddress);
  const dbsBalance = useTokenBalance(tokenAddress, ledgerAddress);

  return (
    <Paper
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'start',
        borderRadius: '0',
        padding: '40px',
      }}
    >
      {mintPrice && (
        <Typography>
          Mint Price(+1%/tx): {formatUnits(mintPrice, 18)}{' '}
          {dbsTokenInfo?.symbol}
        </Typography>
      )}
      {dbsBalance && (
        <Typography>
          Raised: {formatUnits(dbsBalance, 18)} {dbsTokenInfo?.symbol}
        </Typography>
      )}
      {!!mintedCount && (
        <Typography>Minted DBS Cards: {mintedCount.toString()}</Typography>
      )}
    </Paper>
  );
};
