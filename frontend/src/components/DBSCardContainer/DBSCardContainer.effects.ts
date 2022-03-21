import { useEffect, useState } from 'react';
import { useTokenURI, useOwnerOf } from '../../hooks';
import { DragonBallSuperCard } from '../../types';
import { BigNumber } from 'ethers';

export const useDBSCardContainerEffects = (tokenId: number) => {
  const [dbsCard, setDbsCard] = useState<DragonBallSuperCard>();
  const tokenURI = useTokenURI(BigNumber.from(tokenId));
  const ownerOf = useOwnerOf(tokenId);

  useEffect(() => {
    if (tokenURI && ownerOf) {
      setDbsCard({
        id: tokenId,
        uri: tokenURI,
        accountAddress: ownerOf,
      });
    }
  }, [tokenURI, ownerOf]);
  return dbsCard;
};
