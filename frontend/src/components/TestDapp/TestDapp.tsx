import React, { FC, useEffect, useState, useRef } from 'react';
import {
  useMintPrice,
  useMintEnabled,
  useMintedCount,
  useEnableMint,
} from '../../hooks';
import {
  useEtherBalance,
  useEthers,
  useToken,
  useTokenBalance,
} from '@usedapp/core';
import { Box, Button, Typography } from '@mui/material';
import { tokenAddress, ledgerAddress } from '../../constants';
import { formatUnits } from '@ethersproject/units';

export const TestDapp: FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const mountedRef = useRef(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state, send } = useEnableMint();

  const { account } = useEthers();
  const dbsTokenInfo = useToken(tokenAddress);

  const tokenBalance = useTokenBalance(tokenAddress, account);
  const userBalance = useEtherBalance(account);
  const nftBalance = useTokenBalance(ledgerAddress, account);
  const mintPrice = useMintPrice();
  const mintedCount = useMintedCount();
  const mintEnabled = useMintEnabled();

  useEffect(() => {
    setIsConnected(account !== undefined);

    return () => {
      mountedRef.current = false;
    };
  }, [account]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '20px',
        alignItems: 'center',
      }}
      mt={10}
      mb={10}
    >
      {isConnected && (
        <>
          {tokenBalance && (
            <Typography>
              Token Balance: {formatUnits(tokenBalance, 18)}
            </Typography>
          )}
          {nftBalance && (
            <Typography>NFT Balance: {formatUnits(nftBalance, 18)}</Typography>
          )}
          {userBalance && (
            <Typography>
              User Eth Balance:{' '}
              {Number(formatUnits(userBalance, 18))
                .toPrecision(6)
                .replace(/0+$/, '')}
            </Typography>
          )}
          {mintPrice && (
            <Typography>Mint Price: {formatUnits(mintPrice, 18)}</Typography>
          )}
          {!!mintedCount && (
            <Typography>Mint count: {mintedCount.toString()}</Typography>
          )}
          <Typography>{`Mint Enabled: ${mintEnabled}`}</Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '500px',
              gap: '20px',
              alignItems: 'center',
            }}
          >
            <Button variant='contained' onClick={() => send(!mintEnabled)}>
              {mintEnabled ? 'Disable Minting' : 'Enable Minting'}
            </Button>
          </Box>
        </>
      )}

      {dbsTokenInfo && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '500px',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <Typography>DBS name: {dbsTokenInfo.name}</Typography>
          <Typography>DBS symbol: {dbsTokenInfo.symbol}</Typography>
          <Typography>DBS decimals: {dbsTokenInfo.decimals}</Typography>
          <Typography>
            DBS totalSupply:{' '}
            {dbsTokenInfo?.totalSupply
              ? formatUnits(dbsTokenInfo?.totalSupply, dbsTokenInfo?.decimals)
              : ''}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
