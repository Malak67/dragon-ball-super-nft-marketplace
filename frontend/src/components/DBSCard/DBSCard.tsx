import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { shortenAddress } from '@usedapp/core';
import React, { FC } from 'react';
import { DragonBallSuperCard } from '../../types';
import { useDBSCardEffects } from './DBSCard.effects';
import { useStyles } from './DBSCard.styles';

export const DBSCard: FC<DragonBallSuperCard> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  uri,
  accountAddress,
}) => {
  const dbsNft = useDBSCardEffects(uri);
  const classes = useStyles();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      my={4}
    >
      <Card sx={{ maxWidth: 440 }}>
        <CardMedia
          className={classes.media}
          component='img'
          image={dbsNft?.fileUrl}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant='h5' component='div'>
            {dbsNft?.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {dbsNft?.message}
          </Typography>
        </CardContent>
        <CardActions>
          {accountAddress && (
            <Typography
              gutterBottom
              variant='body2'
              color='primary'
              component='div'
            >
              Owned by {shortenAddress(accountAddress)}
            </Typography>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};
