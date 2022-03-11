import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import {
  shortenAddress,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from '@usedapp/core';
import { useStyles } from './Navigation.styles';
import logo from '../../assets/shenron.png';
import { tokenAddress } from '../../constants';
import { FC, useEffect } from 'react';
import { formatUnits } from '@ethersproject/units';
import { useMintPrice, useMintEnabled } from '../hooks';

export const Navigation: FC = () => {
  const classes = useStyles();
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const tokenBalance = useTokenBalance(`${tokenAddress}`, account);
  const userBalance = useEtherBalance(account);
  const mintPrice = useMintPrice();
  const mintEnabled = useMintEnabled();
  console.log('Mint price: ', mintPrice);
  console.log('Mint enabled: ', mintEnabled);
  console.log(
    'userBalance: ',
    userBalance ? formatUnits(userBalance, 18) : userBalance
  );

  if (tokenBalance) {
    console.log('TOKEN BALANCE: ', formatUnits(tokenBalance, 18));
  }
  const isConnected = account !== undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' className={classes.navBar} color='secondary'>
        <Toolbar className={classes.toolbar}>
          <img src={logo} className='App-logo' alt='logo' />
          <Box className={classes.auth}>
            {isConnected ? (
              <>
                {account && <Typography>{shortenAddress(account)}</Typography>}
                <Button variant='contained' onClick={deactivate}>
                  Disconnect
                </Button>
              </>
            ) : (
              <Button
                color='primary'
                variant='contained'
                onClick={() => activateBrowserWallet()}
              >
                Connect
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
