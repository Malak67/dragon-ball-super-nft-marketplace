import { Box } from '@mui/material';
import React, { FC } from 'react';
import { useStyles } from './Hero.styles';

export const Hero: FC = () => {
  const classes = useStyles();

  return <Box className={classes.hero}></Box>;
};
