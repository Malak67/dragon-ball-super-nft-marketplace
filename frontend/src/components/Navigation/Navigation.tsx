import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { shortenAddress, useEthers } from '@usedapp/core';
import { useStyles } from './Navigation.styles';
import logo from '../../assets/shenron.png';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Navigation: FC = () => {
  const classes = useStyles();
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const isConnected = account !== undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' className={classes.navBar} color='secondary'>
        <Toolbar className={classes.toolbar}>
          <Link to='/'>
            <img src={logo} className={classes.logo} alt='logo' />
          </Link>
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
