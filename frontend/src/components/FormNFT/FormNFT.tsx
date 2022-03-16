import React, { FC } from 'react';
import { Box, Button } from '@mui/material';
import { FormInputFile, FormInputText, FormTextareaInput } from '../form';
import { useFormNFTEffects } from './FormNFT.effects';

export const FormNFT: FC = () => {
  const { control, handleSubmit, onSubmit, onFileChange, onUpload, uploading } =
    useFormNFTEffects();

  return (
    <Box>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Box
          style={{ width: '100%' }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'start',
            gap: 2,
          }}
        >
          <Box style={{ width: '100%' }}>
            <FormInputFile
              isLoading={uploading}
              name='fileUrl'
              control={control}
              label='Image'
              accept='image/*'
              id='upload-nft-image'
              buttonText='Select image'
              valueChanged={onFileChange}
              onUpload={onUpload}
            />
          </Box>
          <Box style={{ width: '100%' }}>
            <FormInputText
              name='name'
              control={control}
              label='Name'
              type='text'
            />
          </Box>
          <Box style={{ width: '100%' }}>
            <FormTextareaInput
              name='message'
              control={control}
              label='Message'
              rows={4}
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
            <Button variant='contained' type='submit' color='primary'>
              Mint
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};
