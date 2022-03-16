import { useContractFunction } from '@usedapp/core';
import DragonBallSuperToken from '../blockchain/DragonBallSuperToken.json';
import { tokenAddress } from '../constants';
import { utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';

export const useTokenApprove = () => {
  const { abi } = DragonBallSuperToken;
  const dbsTokenInterface = new utils.Interface(abi);

  const dbsTokenContract = new Contract(tokenAddress, dbsTokenInterface);

  return useContractFunction(dbsTokenContract, 'approve', {
    transactionName: 'Approve ERC20 transfer',
  });
};
