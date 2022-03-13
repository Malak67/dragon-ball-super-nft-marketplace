import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation';

export const MainLayout: FC = () => (
  <>
    <Navigation />
    <Outlet />
  </>
);
