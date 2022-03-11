import { FC } from 'react';
import {
  useMintPrice,
  useMintEnabled,
  useMintedCount,
  useEnableMint,
} from '../../hooks';
import {
  useEtherBalance,
  useEthers,
  useToken,
  useTokenBalance,
} from '@usedapp/core';
import { Box, Button, Typography } from '@mui/material';
import { tokenAddress, ledgerAddress } from '../../constants';
import { formatUnits } from '@ethersproject/units';

export const TestDapp: FC = () => {
  const { state, send } = useEnableMint();
  console.log('state: ', state);

  const { account } = useEthers();

  const tokenBalance = useTokenBalance(tokenAddress, account);
  const userBalance = useEtherBalance(account);
  const mintPrice = useMintPrice();
  const mintEnabled = useMintEnabled();
  const mintedCount = useMintedCount();
  const dbsTokenInfo = useToken(tokenAddress);
  const ledgerBalance = useTokenBalance(ledgerAddress, account);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '20px',
        alignItems: 'center',
      }}
      mt={10}
      mb={10}
    >
      {tokenBalance && (
        <Typography>Token Balance: {formatUnits(tokenBalance, 18)}</Typography>
      )}
      {ledgerBalance && (
        <Typography>
          Ledger Balance: {formatUnits(ledgerBalance, 18)}
        </Typography>
      )}
      {userBalance && (
        <Typography>User Balance: {formatUnits(userBalance, 18)}</Typography>
      )}
      {mintPrice && <Typography>Mint Price: {mintPrice}</Typography>}
      {mintedCount && (
        <Typography>Mint count: {mintedCount.toString()}</Typography>
      )}
      <Typography>Mint Enabled: {mintEnabled.toString()}</Typography>
      {dbsTokenInfo && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '500px',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <Typography>DBS name: {dbsTokenInfo.name}</Typography>
          <Typography>DBS symbol: {dbsTokenInfo.symbol}</Typography>
          <Typography>DBS decimals: {dbsTokenInfo.decimals}</Typography>
          <Typography>
            DBS totalSupply:{' '}
            {dbsTokenInfo?.totalSupply
              ? formatUnits(dbsTokenInfo?.totalSupply, dbsTokenInfo?.decimals)
              : ''}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '500px',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <Button variant='contained' onClick={() => send(!mintEnabled)}>
          {mintEnabled ? 'Disable Minting' : 'Enable Minting'}
        </Button>
      </Box>
    </Box>
  );
};
