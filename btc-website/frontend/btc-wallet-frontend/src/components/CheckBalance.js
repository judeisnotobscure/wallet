import React, { useState } from 'react';
import { checkBalance } from '../apiService';

const CheckBalance = () => {
  const [walletId, setWalletId] = useState('');
  const [balance, setBalance] = useState(null);

  const handleCheckBalance = async () => {
    const result = await checkBalance(walletId);
    setBalance(result.balance);
  };

  return (
    <div>
      <h2>Check Balance</h2>
      <input
        type="text"
        value={walletId}
        onChange={(e) => setWalletId(e.target.value)}
        placeholder="Wallet ID"
      />
      <button onClick={handleCheckBalance}>Check</button>
      {balance !== null && <p>Balance: {balance}</p>}
    </div>
  );
};

export default CheckBalance;
