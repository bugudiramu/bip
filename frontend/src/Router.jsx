import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MovieDetail from './components/MovieDetail';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path=':id' element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
