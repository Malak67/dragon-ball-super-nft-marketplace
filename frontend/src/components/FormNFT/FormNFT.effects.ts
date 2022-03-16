/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { ipfsClient, tokenAddress } from '../../constants';
import { fullIpfsUrl } from '../../utils';
import { useMintItem, useMintPrice } from '../../hooks';
import { useEthers, useTokenBalance } from '@usedapp/core';

export interface IMintMetadata {
  name: string;
  message: string;
  fileUrl: string;
}

const FILE_MAX_SIZE = 5 * 1000 * 1024; // 5mb

export const useFormNFTEffects = () => {
  const { account } = useEthers();

  const [uploading, setIsUploading] = useState<boolean>(false);
  const [fileToUpload, setFile] = useState<any>();
  const [fileUrl, setFileUrl] = useState<string>('');
  const { state: mintState, send: mintSend } = useMintItem();
  const mintPrice = useMintPrice();
  const tokenBalance = useTokenBalance(tokenAddress, account);
  const [hasEnoughTokens, setHasEnoughTokens] = useState(false);

  const isMinting = mintState.status === "Mining"

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
    reset,
    setError,
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

  useEffect(() => {
    if (!!tokenBalance && !!mintPrice) {
      const checkHasTokens = async () => {
        setHasEnoughTokens(tokenBalance.gte(mintPrice));
        console.log('hasEnoughTokens: ', hasEnoughTokens)
      };
      checkHasTokens();
    }
  }, [mintPrice, tokenBalance]);

  const onSubmit = async (data: IMintMetadata) => {
    const mintItem = {
      name: data.name,
      message: data.message,
      fileUrl: fileUrl,
    };
    const uploaded = await ipfsClient.add(JSON.stringify(mintItem));
    reset();
    return mintSend(`${fullIpfsUrl(uploaded.path)}`)
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];
    console.log(typeof file);
    if (!file) {
      setError('fileUrl', {
        type: 'manual',
        message: 'Image missing',
      });
      return;
    }

    if (file.size > FILE_MAX_SIZE) {
      setError('fileUrl', {
        type: 'manual',
        message: 'The image cannot be bigger than 5MB',
      });
      return;
    }
    setFile(file);
  };

  const onUpload = async () => {
    setIsUploading(true);
    try {
      const uploaded = await ipfsClient.add(fileToUpload);
      const url = `${fullIpfsUrl(uploaded.path)}`;
      console.log('url: ', url);
      setFileUrl(url);
    } catch (error) {
      setError('fileUrl', {
        type: 'manual',
        message: `${error}`,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    onFileChange,
    onUpload,
    uploading,
  };
};
