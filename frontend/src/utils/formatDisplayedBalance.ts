import { formatUnits } from '@ethersproject/units';
import { BigNumber } from 'ethers';

export const formatDisplayedBalance = (tokenBalance: BigNumber | string | number) => {
  if (!tokenBalance) {
    return tokenBalance;
  }
  return Number(formatUnits(tokenBalance, 18)).toPrecision(6).replace(/0+$/, '');
};
