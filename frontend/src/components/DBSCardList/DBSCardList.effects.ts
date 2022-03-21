import { useEffect } from 'react';
import { useMintedCount, useOwnerURI } from '../../hooks';

export const useDBSCardListEffects = () => {
  // const { getTokenURI, getOwner } = useOwnerURI();
  const mintedCount = useMintedCount();
  return { mintedCount };
};
