import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';

/*
  Scheme colors:
  https://www.schemecolor.com/goku-dragon-ball-z-cartoon-colors.php
*/
const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#F85B1A',
      dark: '#E59982',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#072083',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#8A9294',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#E74A50',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF', // #081016
    },
  },
  typography: {
    // fontFamily: 'Lato',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          padding: '8px 16px',
          fontSize: '15px',
          lineHeight: '30px',
          width: 'auto',
          minWidth: '200px'
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '60px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          lineHeight: '1.6',
        },
        h1: {
          fontWeight: 500,
          fontSize: '4rem',
        },
        h2: {
          fontWeight: 400,
          fontSize: '3rem',
        },
        h3: {
          fontWeight: 400,
          fontSize: '2rem',
        },
        h4: {
          fontWeight: 400,
          fontSize: '1.5rem',
        },
        h5: {
          fontWeight: 400,
          fontSize: '1.2rem',
        },
      },
    },
  },
};

export const theme: Theme = createTheme(lightTheme);
