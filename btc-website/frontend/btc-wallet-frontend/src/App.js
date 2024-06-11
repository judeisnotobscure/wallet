import React, { useState } from 'react';
import CreateWallet from './components/CreateWallet';
import CheckBalance from './components/CheckBalance';
import SendTransaction from './components/SendTransaction';
import './styles.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <header>
        <h1>BTC Wallet</h1>
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </header>
      <main>
        <CreateWallet />
        <CheckBalance />
        <SendTransaction />
      </main>
    </div>
  );
};

export default App;
