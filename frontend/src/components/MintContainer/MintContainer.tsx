import React, { FC, useEffect, useRef, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useEthers, useTokenBalance } from '@usedapp/core';
import { Mint } from '../Mint';
import { ledgerAddress } from '../../constants';
import { LoadingText } from '../LoadingText';
import { FormNFT } from '../FormNFT';
import notConnected from '../../assets/roshi.jpg';

export const MintContainer: FC = () => {
  const { account, activateBrowserWallet } = useEthers();
  const nftBalance = useTokenBalance(ledgerAddress, account);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    if (nftBalance !== undefined) {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    setIsConnected(account !== undefined);

    return () => {
      mountedRef.current = false;
    };
  }, [account]);

  if (isLoading) {
    return <LoadingText text='Loading' />;
  }

  return (
    <Box>
      {!isConnected ? (
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '0',
            gap: '15px',
            margin: '20px',
            padding: '40px',
          }}
        >
          <Typography variant='h4'>You are not connected</Typography>
          <Typography variant='h4'>
            Please connect so you can start minting
          </Typography>
          <img src={notConnected} width='300' alt='loading' />
          <Button
            color='primary'
            variant='contained'
            onClick={() => activateBrowserWallet()}
          >
            Connect
          </Button>
        </Paper>
      ) : (
        <Box>
          {nftBalance !== undefined && nftBalance.toNumber() > 0 ? (
            <Mint />
          ) : (
            <FormNFT />
          )}
        </Box>
      )}
    </Box>
  );
};
