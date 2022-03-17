import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    hero: {
      backgroundImage: `url('./hero.png')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '900px'
    },
  };
});
