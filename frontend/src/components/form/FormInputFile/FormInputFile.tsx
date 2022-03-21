import React from 'react';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  FormHelperText,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useStyles } from './FormInputFile.styles';

export interface FormInputFileProps {
  isLoading: boolean;
  name: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  accept: string;
  label: string;
  buttonText: string;
  className?: string;
  valueChanged?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
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
              <Typography>{label}</Typography>
              {value && <FormHelperText>{value}</FormHelperText>}
              <Box sx={{ width: '100%', display: 'flex', gap: '20px' }}>
                <input
                  accept={accept}
                  type='file'
                  id={id}
                  disabled={disabled}
                  className={`${className} ${classes.input}`}
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e);
                    if (typeof valueChanged !== 'undefined') {
                      valueChanged(e);
                    }
                  }}
                />
                <label htmlFor={id}>
                  <Button
                    variant='outlined'
                    component='span'
                    disabled={disabled}
                  >
                    {buttonText}
                  </Button>
                </label>
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
