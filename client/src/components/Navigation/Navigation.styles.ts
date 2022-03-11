import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    navBar: {
      boxShadow: 'none',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    auth: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
    },
  };
});
