import { useEffect, useState } from 'react';
import { DragonBallSuperNFT } from '../../types';

export const useDBSCardEffects = (uri: string) => {
  const [dbsNft, setDbsNft] = useState<DragonBallSuperNFT>();

  useEffect(() => {
    const fetchUri = async () => {
      const result = await fetch(uri);
      const nftResult = await result.json();
      setDbsNft(nftResult);
    };
    fetchUri();
  }, [uri]);

  return dbsNft;
};
