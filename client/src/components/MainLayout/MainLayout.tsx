import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Navigation } from '../Navigation';

const MainLayout = () => (
  <Box>
    <Navigation />
    <Outlet />
  </Box>
);

export default MainLayout;
