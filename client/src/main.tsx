import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CssBaseline } from '@mui/material';
import './index.css';
import App from './App';
import { DBSThemeProvider } from './theme';
import { ChainId, Config, DAppProvider } from '@usedapp/core';

const config: Config = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Rinkeby]: `${import.meta.env.VITE_RINKEBY_RPC_URL}`,
    [ChainId.Kovan]: `${import.meta.env.VITE_KOVAN_RPC_URL}`,
    [ChainId.Ropsten]: `${import.meta.env.VITE_ROPSTEN_URL}`,
  },
  notifications: {
    expirationPeriod: 1000,
    checkInterval: 1000,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DBSThemeProvider>
        <CssBaseline />
        <DAppProvider config={config}>
          <App />
        </DAppProvider>
        <ToastContainer />
      </DBSThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
