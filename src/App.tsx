import React, { FC } from 'react';
import './App.scss';
import { AdvertisingDataOverview } from './pages/AdvertisingDataOverview';

const App: FC = () => {
  return (
    <div className="App">
      <AdvertisingDataOverview />
    </div>
  );
}

export default App;
