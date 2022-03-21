import { useContractCall, useEthers } from '@usedapp/core';
import { Falsy } from '@usedapp/core/dist/esm/src/model/types';
import DragonBallSuperLedger from '../blockchain/DragonBallSuperLedger.json';
import { ledgerAddress } from '../constants';
import { utils } from 'ethers';
import { useMintedCount } from './useMintedCount';
import { useEffect } from 'react';

export const useOwnerURI = () => {
  const mintedCount = useMintedCount();
  const { account } = useEthers();
  const { abi } = DragonBallSuperLedger;
  const dbsLedgerInterface = new utils.Interface(abi);
  const tokenAddress: string | Falsy = ledgerAddress || null;

  const getTokenURI = (tokenOfOwnerByIndex: number) => {
    const [tokenURI] =
      useContractCall(
        tokenOfOwnerByIndex !== null &&
          tokenOfOwnerByIndex !== undefined &&
          account &&
          tokenAddress && {
            abi: dbsLedgerInterface,
            address: tokenAddress,
            method: 'tokenURI',
            args: [tokenOfOwnerByIndex],
          }
      ) ?? [];
    return tokenURI;
  };

  const getOwner = (tokenOfOwnerByIndex: number) => {
    const [owner] =
      useContractCall(
        tokenOfOwnerByIndex !== null &&
          tokenOfOwnerByIndex !== undefined &&
          account &&
          tokenAddress && {
            abi: dbsLedgerInterface,
            address: tokenAddress,
            method: 'ownerOf',
            args: [tokenOfOwnerByIndex],
          }
      ) ?? [];
    return owner;
  };

  const getTokenUrisOwners = (tokenOfOwnerByIndex: number) => {
    const [tokenURI] =
      useContractCall(
        tokenOfOwnerByIndex !== null &&
          tokenOfOwnerByIndex !== undefined &&
          account &&
          tokenAddress && {
            abi: dbsLedgerInterface,
            address: tokenAddress,
            method: 'tokenURI',
            args: [tokenOfOwnerByIndex],
          }
      ) ?? [];

    const [owner] =
      useContractCall(
        tokenOfOwnerByIndex !== null &&
          tokenOfOwnerByIndex !== undefined &&
          account &&
          tokenAddress && {
            abi: dbsLedgerInterface,
            address: tokenAddress,
            method: 'ownerOf',
            args: [tokenOfOwnerByIndex],
          }
      ) ?? [];
    return { tokenURI, owner };
  };

  useEffect(() => {
    if (mintedCount?.toNumber()) {
      for (let tokenId = mintedCount?.toNumber(); tokenId >= 1; tokenId--) {
        // const owner = getOwner(tokenId);
        const {tokenURI, owner} = getTokenUrisOwners(tokenId);
        // console.log('tokenURI: ', tokenURI);
        console.log('owner: ', owner);
      }
    }
  }, [mintedCount]);

  return { getTokenURI, getOwner };
};
