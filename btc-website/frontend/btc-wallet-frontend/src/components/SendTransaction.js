import React, { useState } from 'react';
import { sendTransaction } from '../apiService';

const SendTransaction = () => {
  const [walletId, setWalletId] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState(null);

  const handleSendTransaction = async () => {
    const result = await sendTransaction(walletId, toAddress, amount);
    setTransactionId(result.transaction_id);
  };

  return (
    <div>
      <h2>Send Transaction</h2>
      <input
        type="text"
        value={walletId}
        onChange={(e) => setWalletId(e.target.value)}
        placeholder="Wallet ID"
      />
      <input
        type="text"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        placeholder="To Address"
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleSendTransaction}>Send</button>
      {transactionId && <p>Transaction ID: {transactionId}</p>}
    </div>
  );
};

export default SendTransaction;
