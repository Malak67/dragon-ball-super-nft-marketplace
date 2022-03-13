import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CssBaseline } from '@mui/material';
import './index.css';
import App from './App';
import { DBSThemeProvider } from './theme';
import { ChainId, DAppProvider } from '@usedapp/core';
import type { Config } from '@usedapp/core';

const config: Config = {
  readOnlyChainId: ChainId.Kovan,
  readOnlyUrls: {
    [ChainId.Rinkeby]: `${process.env.REACT_APP_RINKEBY_RPC_URL}`,
    [ChainId.Kovan]: `${process.env.REACT_APP_KOVAN_RPC_URL}`,
    [ChainId.Ropsten]: `${process.env.REACT_APP_ROPSTEN_URL}`,
  },
  notifications: {
    expirationPeriod: 1000,
    checkInterval: 1000,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <DBSThemeProvider>
      <CssBaseline />
      <DAppProvider config={config}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DAppProvider>
      <ToastContainer />
    </DBSThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
