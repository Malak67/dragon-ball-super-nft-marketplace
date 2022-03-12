import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout/MainLayout';
import { Home, Test } from './pages';
import { PageNotFound } from './pages/PageNotFound';
import './App.css';

const App = () => (
  <Routes>
    <Route path='/' element={<MainLayout />}>
      <Route path='/' element={<Home />} />
      <Route path='test' element={<Test />} />
      <Route path='*' element={<PageNotFound />} />
    </Route>
  </Routes>
);
export default App;
