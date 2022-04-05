import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { InputProps, TextField } from '@mui/material';
import { checkMethod } from '../../../utils';

export interface FormTextareaInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  rows: number;
  className?: string;
  valueChanged?: () => void;
  defaultValue?: string | number;
  hint?: string;
  errorMessage?: string;
  inputProps?: InputProps;
  disabled?: boolean;
}

export const FormTextareaInput: FC<FormTextareaInputProps> = ({
  name,
  control,
  label,
  rows,
  className,
  valueChanged,
  defaultValue,
  hint,
  errorMessage,
  inputProps,
  disabled = false,
}) => {
  return (
    <Controller
      defaultValue={defaultValue || ''}
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <TextField
          fullWidth
          disabled={disabled}
          variant='outlined'
          className={`${className}`}
          label={label}
          value={value}
          multiline
          rows={rows}
          onBlur={onBlur}
          onChange={(e) => {
            onChange(e);
            checkMethod(valueChanged);
          }}
          error={!!error || !!errorMessage}
          helperText={
            error || errorMessage ? errorMessage || error?.message : hint
          }
          InputProps={inputProps}
        />
      )}
    />
  );
};
