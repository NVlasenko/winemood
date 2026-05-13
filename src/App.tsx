import React from 'react';
import { Outlet } from 'react-router-dom';
// import { Header } from './components/Header/Header';

import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="App">
      {/* <Header /> */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};