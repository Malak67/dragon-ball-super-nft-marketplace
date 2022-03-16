import { useContractCall, useEthers } from '@usedapp/core';
import { Falsy } from '@usedapp/core/dist/esm/src/model/types';
import DragonBallSuperLedger from '../blockchain/DragonBallSuperLedger.json';
import { ledgerAddress } from '../constants';
import { utils } from 'ethers';

export const useMintPrice = () => {
  const { account } = useEthers();
  const tokenAddress: string | Falsy = ledgerAddress || null;
  const { abi } = DragonBallSuperLedger;
  const dbsLedgerInterface = new utils.Interface(abi);

  const [mintPrice] =
    useContractCall(
      account &&
        tokenAddress && {
          abi: dbsLedgerInterface, // ABI interface of the called contract
          address: tokenAddress, // On-chain address of the deployed contract
          method: 'mintPrice', // Method to be called
          args: [], // Method arguments
        }
    ) ?? [];
  return mintPrice;
};
