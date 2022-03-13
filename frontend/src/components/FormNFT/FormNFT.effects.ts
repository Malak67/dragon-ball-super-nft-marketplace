import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

export interface IMintMetadata {
  name: string;
  message: string;
  fileUrl: string;
}

export const useFormNFTEffects = () => {
  const [uploading, setIsUploading] = useState<boolean>(false)

  const defaultValues: IMintMetadata = {
    name: '',
    message: '',
    fileUrl: '',
  };

  const validationSchema = yup
    .object({
      name: yup.string().required('Name is required').label('Name'),
      message: yup.string().required('Message is required').label('Message'),
      fileUrl: yup.string().required('Image is required').label('File'),
    })
    .required();

  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: IMintMetadata) => {
    console.log('data: ', data);
    reset();
  };

  const onFileChange = () => {
    const fileInput = getValues('fileUrl');
    console.log('ON CHANGE FILE INPUT: ', fileInput);
  };

  const onUpload = () => {
    console.log('Uploading image');
  }

  return {
    control,
    handleSubmit,
    onSubmit,
    onFileChange,
    onUpload,
    uploading,
  };
};
