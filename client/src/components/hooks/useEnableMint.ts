import { useContractFunction } from '@usedapp/core';
import DragonBallSuperLedger from '../../blockchain/DragonBallSuperLedger.json';
import { ledgerAddress } from '../../constants';
import { utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';

export const useEnableMint = () => {
  const { abi } = DragonBallSuperLedger;
  const dbsLedgerInterface = new utils.Interface(abi);

  const dbsLedgerContract = new Contract(ledgerAddress, dbsLedgerInterface);

  return useContractFunction(dbsLedgerContract, 'setMintingStatus', {
    transactionName: 'Set Minting Status',
  });
};
