import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components';
import { Home, Test, PageNotFound } from './pages';

const App = () => (
  <Routes>
    <Route path='/' element={<MainLayout />}>
      <Route path='/' element={<Home />} />
      <Route path='gigel' element={<Home />} />
      <Route path='test' element={<Test />} />
      <Route path='*' element={<PageNotFound />} />
    </Route>
  </Routes>
);
export default App;
