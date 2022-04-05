import { makeStyles } from '@mui/styles';
import { theme } from '../../theme';

export const useStyles = makeStyles(() => {
  return {
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '0',
      marginTop: '20px',
      marginBottom: '20px',
      padding: '40px',
      background: theme.palette.secondary.main,
      color: theme.palette.common.white,
      fontWeigth: '600'
    },
  };
});
