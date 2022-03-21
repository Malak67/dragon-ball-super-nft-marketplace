import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { useTokenURI, useTokenOfOwnerByIndex } from '../../hooks';
import { DragonBallSuperCard } from '../../types';

export const useMintEffects = () => {
  const { account } = useEthers();
  const [dbsCard, setDbsCard] = useState<DragonBallSuperCard>();
  const tokenOfOwnerByIndex = useTokenOfOwnerByIndex();
  const tokenURI = useTokenURI();

  useEffect(() => {
    if (tokenURI && account) {
      setDbsCard({
        id: tokenOfOwnerByIndex,
        uri: tokenURI,
        accountAddress: account,
      });
    }
  }, [tokenURI, account]);
  return dbsCard;
};
