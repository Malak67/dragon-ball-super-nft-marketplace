import logo from './logo.svg';
import './App.css';
import { useEthers } from '@usedapp/core';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { theme } from './theme';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "flex-end",
  },
}))

function App() {
  const classes = useStyles()
  const { account, activateBrowserWallet, deactivate } = useEthers();
  console.log('ACCOUNT: ', account)
  const isConnected = account !== undefined;
  return (
    <div className='App'>
      <header className='App-header'>
        <div className={classes.container}>
          {isConnected ? (
            <>
              <Button color='primary' variant='contained'>
                {`${account?.slice(0, 4)}...${account?.slice(-3)}`}
              </Button>
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
        </div>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
    </div>
  );
}

export default App;
