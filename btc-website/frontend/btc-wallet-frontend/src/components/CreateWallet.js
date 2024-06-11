import React, { useState } from 'react';
import { createWallet, recoverWallet } from '../apiService';


const CreateWallet = () => {
  const [currency, setCurrency] = useState('BTC');
  const [mnemonicWords, setMnemonicWords] = useState(Array(12).fill(''));
  const [wordCount, setWordCount] = useState(12);
  const [wallet, setWallet] = useState(null);
  const [recovering, setRecovering] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleCreateWallet = async () => {
    const result = await createWallet(currency);
    setWallet(result);
  };

  const handleRecoverWallet = async () => {
    const mnemonic = mnemonicWords.join(' ').trim();
    const result = await recoverWallet(currency, mnemonic);
    setWallet(result);
  };

  const handleWordChange = (index, value) => {
    const newWords = [...mnemonicWords];
    newWords[index] = value;
    setMnemonicWords(newWords);
  };

  const handleWordCountChange = (count) => {
    setWordCount(count);
    setMnemonicWords(Array(count).fill(''));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <h2>{recovering ? 'Recover Wallet' : 'Create Wallet'}</h2>
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
        {/* Add other currencies as needed */}
      </select>
      {recovering && (
        <div>
          <div>
            <label>
              <input
                type="radio"
                checked={wordCount === 12}
                onChange={() => handleWordCountChange(12)}
              />
              12 words
            </label>
            <label>
              <input
                type="radio"
                checked={wordCount === 24}
                onChange={() => handleWordCountChange(24)}
              />
              24 words
            </label>
          </div>
          <div className="mnemonic-inputs">
            {mnemonicWords.map((word, index) => (
              <input
                key={index}
                type="text"
                value={word}
                onChange={(e) => handleWordChange(index, e.target.value)}
                placeholder={index + 1}
              />
            ))}
          </div>
        </div>
      )}
      <button onClick={recovering ? handleRecoverWallet : handleCreateWallet}>
        {recovering ? 'Recover' : 'Create'}
      </button>
      <button onClick={() => setRecovering(!recovering)}>
        {recovering ? 'Create New Wallet' : 'Recover Existing Wallet'}
      </button>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      {wallet && (
        <div>
          <p>Address: {wallet.address}</p>
          {wallet.mnemonic && <p>Mnemonic: {wallet.mnemonic}</p>}
        </div>
      )}
    </div>
  );
};

export default CreateWallet;
