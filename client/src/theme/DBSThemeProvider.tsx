import React, { FC } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { theme } from './theme';

export const DBSThemeProvider: FC = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};
