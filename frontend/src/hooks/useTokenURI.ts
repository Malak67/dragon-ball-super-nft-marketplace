import { useContractCall, useEthers } from '@usedapp/core';
import { Falsy } from '@usedapp/core/dist/esm/src/model/types';
import DragonBallSuperLedger from '../blockchain/DragonBallSuperLedger.json';
import { ledgerAddress } from '../constants';
import { utils } from 'ethers';
import { useTokenOfOwnerByIndex } from './useTokenOfOwnerByIndex';

export const useTokenURI = () => {
  const tokenOfOwnerByIndex = useTokenOfOwnerByIndex();
  const { account } = useEthers();
  const tokenAddress: string | Falsy = ledgerAddress || null;
  const { abi } = DragonBallSuperLedger;
  const dbsLedgerInterface = new utils.Interface(abi);
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
