import { Box, Button } from '@mui/material';
import './App.css';
import { Navigation } from './components';
import { useEnableMint, useMintEnabled } from './components/hooks';

function App() {
  const { state, send } = useEnableMint();
  const mintEnabled = useMintEnabled();
  console.log('mintEnabled: ', mintEnabled);
  console.log('state: ', state);
  return (
    <div className='App'>
      <Navigation />
      <Box>
        <Button variant='contained' onClick={() => send(!mintEnabled)}>
          {mintEnabled ? 'Disabled' : 'Enable'}
        </Button>
      </Box>
    </div>
  );
}

export default App;
