import { useContractCall, useEthers } from '@usedapp/core';
import DragonBallSuperToken from '../blockchain/DragonBallSuperToken.json';
import { tokenAddress, ledgerAddress } from '../constants';
import { utils } from 'ethers';

export const useTokenAllowance = () => {
  const { account } = useEthers();
  const { abi } = DragonBallSuperToken;
  const dbsTokenInterface = new utils.Interface(abi);

  const [allowance] =
    useContractCall(
      account &&
        ledgerAddress &&
        tokenAddress && {
          abi: dbsTokenInterface,
          address: tokenAddress,
          method: 'allowance',
          args: [account, ledgerAddress],
        }
    ) ?? [];
  return allowance;
};

// Can be used directly from useDapp