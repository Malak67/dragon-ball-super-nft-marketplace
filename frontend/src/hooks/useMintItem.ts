import { useContractFunction } from '@usedapp/core';
import DragonBallSuperLedger from '../blockchain/DragonBallSuperLedger.json';
import { ledgerAddress } from '../constants';
import { utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { useTokenAllowance } from './useTokenAllowance';
import { useTokenApprove } from './useTokenApprove';
import { useMintPrice } from './useMintPrice';
import { useEffect, useState } from 'react';

export const useMintItem = () => {
  const { abi } = DragonBallSuperLedger;
  const mintPrice = useMintPrice();
  const currentAllowance = useTokenAllowance();
  const { state: approveErc20State, send: approveErc20Send } =
    useTokenApprove();

  const dbsLedgerInterface = new utils.Interface(abi);

  const dbsLedgerContract = new Contract(ledgerAddress, dbsLedgerInterface);

  const { state: mintState, send: mintSend } = useContractFunction(
    dbsLedgerContract,
    'mint',
    {
      transactionName: 'Minting Dragon Ball Super Card',
    }
  );

  const [mintUrl, setMintUrl] = useState<string>('');

  useEffect(() => {
    console.log('This is triggered: ', approveErc20State.status);
    if (approveErc20State.status === 'Success') {
      console.log('mintUrl: ', mintUrl)
      console.log('This is triggered: ', approveErc20State.status);
      // mintSend(mintUrl);
    }
  }, [approveErc20State, mintUrl]);

  const [state, setState] = useState(approveErc20State);

  const send = (fullIpfsUrl: string) => {
    setMintUrl(fullIpfsUrl);
    // if (currentAllowance.lt(mintPrice)) {
    //   return approveErc20Send(ledgerAddress, mintPrice);
    // }
    return approveErc20Send(ledgerAddress, mintPrice);
    // return;
  };

  useEffect(() => {
    if (approveErc20State.status === 'Success') {
      setState(mintState);
    } else {
      setState(approveErc20State);
    }
  }, [approveErc20State, mintState]);

  return {
    send,
    state,
  };
};
