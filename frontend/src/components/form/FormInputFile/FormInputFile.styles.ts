import { makeStyles } from '@mui/styles';
import { theme } from '../../../theme';

export const useStyles = makeStyles(() => {
  return {
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    inputWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      justifyContent: 'start',
      gap: '10px',
      width: '100%',
    },
  };
});
