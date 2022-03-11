import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import {
  shortenAddress,
  useEthers,
} from '@usedapp/core';
import { useStyles } from './Navigation.styles';
import logo from '../../assets/shenron.png';
import { FC } from 'react';

export const Navigation: FC = () => {
  const classes = useStyles();
  const { account, activateBrowserWallet, deactivate } = useEthers();
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
