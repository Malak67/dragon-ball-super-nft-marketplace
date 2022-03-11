import { useContractCall, useEthers } from '@usedapp/core';
import { Falsy } from '@usedapp/core/dist/esm/src/model/types';
import DragonBallSuperLedger from '../blockchain/DragonBallSuperLedger.json';
import { ledgerAddress } from '../constants';
import { utils } from 'ethers';

export const useMintedCount = () => {
  const { account } = useEthers();
  const tokenAddress: string | Falsy = ledgerAddress || null;
  const { abi } = DragonBallSuperLedger;
  const dbsLedgerInterface = new utils.Interface(abi);
  const [mintedCount] =
    useContractCall(
      account &&
        tokenAddress && {
          abi: dbsLedgerInterface,
          address: tokenAddress,
          method: '_tokenIdCounter',
          args: [],
        }
    ) ?? [];
  return mintedCount;
};
