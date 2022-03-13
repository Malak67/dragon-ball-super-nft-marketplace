import React from 'react';
import { FC, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  FormHelperText,
  Typography,
  CircularProgress,
} from '@mui/material';
import { checkMethod } from '../../../utils';
import { useStyles } from './FormInputFile.styles';

export interface FormInputFileProps {
  isLoading: boolean;
  name: string;
  id: string;
  control: Control<any>;
  accept: string;
  label: string;
  buttonText: string;
  className?: string;
  valueChanged?: () => void;
  disabled?: boolean;
  onUpload?: () => void;
}

export const FormInputFile: FC<FormInputFileProps> = ({
  isLoading,
  name,
  id,
  control,
  accept,
  label,
  className,
  buttonText,
  valueChanged,
  disabled = false,
  onUpload,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Box className={classes.inputWrapper}>
              {value && <FormHelperText>{value}</FormHelperText>}
              <Box sx={{ width: '100%', display: 'flex', gap: '20px' }}>
                <input
                  accept={accept}
                  type='file'
                  id={id}
                  disabled={disabled}
                  value={value}
                  className={`${className} ${classes.input}`}
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e);
                    checkMethod(valueChanged);
                  }}
                />
                <label htmlFor={id}>
                  <Button variant='outlined' component='span'>
                    {buttonText}
                  </Button>
                </label>
                {value && (
                  <Button variant='contained' onClick={onUpload}>
                    Upload
                  </Button>
                )}
              </Box>
              {!!error && (
                <Typography
                  color='error'
                  style={{ fontWeight: 400, fontSize: '0.75rem' }}
                >
                  {error?.message}
                </Typography>
              )}
            </Box>
          )}
        />
      )}
    </Box>
  );
};
