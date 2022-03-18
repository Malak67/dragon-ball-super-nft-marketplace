import { useEthers, useTokenBalance } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { ledgerAddress } from '../../constants';
import { useTokenURI, useTokenOfOwnerByIndex } from '../../hooks';
import { DragonBallSuperCard } from '../../types';

export const useMintEffects = () => {
  const { account } = useEthers();
  const [dbsCard, setDbsCard] = useState<DragonBallSuperCard>();
  const nftBalance = useTokenBalance(ledgerAddress, account);
  const tokenOfOwnerByIndex = useTokenOfOwnerByIndex();
  const tokenURI = useTokenURI();

  useEffect(() => {
    if (!nftBalance) {
      return;
    }
    if (tokenURI && account) {
      setDbsCard({
        id: tokenOfOwnerByIndex,
        uri: tokenURI,
        accountAddress: account,
      });
    }
  }, [account]);

  return dbsCard;
};
