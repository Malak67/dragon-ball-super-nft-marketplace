import { useContractCall, useEthers } from '@usedapp/core';
import { Falsy } from '@usedapp/core/dist/esm/src/model/types';
import DragonBallSuperLedger from '../blockchain/DragonBallSuperLedger.json';
import { ledgerAddress } from '../constants';
import { utils } from 'ethers';

export const useOwnerOf = (tokenIndex: number) => {
  const { account } = useEthers();
  const { abi } = DragonBallSuperLedger;
  const dbsLedgerInterface = new utils.Interface(abi);
  const tokenAddress: string | Falsy = ledgerAddress || null;

  const [owner] =
    useContractCall(
      tokenIndex !== null &&
        tokenIndex !== undefined &&
        account &&
        tokenAddress && {
          abi: dbsLedgerInterface,
          address: tokenAddress,
          method: 'ownerOf',
          args: [tokenIndex],
        }
    ) ?? [];
  return owner;
};
