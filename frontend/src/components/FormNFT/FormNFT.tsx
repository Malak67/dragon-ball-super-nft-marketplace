import React, { FC } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { FormInputFile, FormInputText, FormTextareaInput } from '../form';
import { useFormNFTEffects } from './FormNFT.effects';
import { LoadingText } from '../LoadingText';

export const FormNFT: FC = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    onFileChange,
    uploading,
    isMinting,
    hasEnoughTokens,
  } = useFormNFTEffects();

  if (isMinting) {
    return <LoadingText text='Minting NFT...' />;
  }

  return (
    <Paper
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        borderRadius: '0',
        marginTop: '20px',
        marginBottom: '20px',
        padding: '40px',
      }}
    >
      <form
        style={{ width: '100%' }}
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant='h3' color='secondary' align='center' mb={3}>
          Mint your own Dragon Ball Super Card
        </Typography>
        {!hasEnoughTokens && (
          <Typography variant='h4' color='error' align='center' mb={3}>
            Unfortunately, you don`t have enough DBS tokens to mint!
          </Typography>
        )}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'start',
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            <FormInputFile
              isLoading={uploading}
              name='fileUrl'
              control={control}
              label='Upload your Dragon Ball Super Image on IPFS'
              accept='image/*'
              id='upload-nft-image'
              buttonText='Upload image'
              valueChanged={onFileChange}
              disabled={!hasEnoughTokens}
            />
          </Box>
          <Box style={{ width: '100%' }}>
            <FormInputText
              name='name'
              control={control}
              label='Name'
              type='text'
              disabled={!hasEnoughTokens}
            />
          </Box>
          <Box style={{ width: '100%' }}>
            <FormTextareaInput
              name='message'
              control={control}
              label='Message'
              rows={4}
              disabled={!hasEnoughTokens}
            />
          </Box>
          <Box
            style={{ width: '100%' }}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'start',
            }}
          >
            <Button
              variant='contained'
              type='submit'
              color='primary'
              disabled={!hasEnoughTokens}
            >
              Mint
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};
