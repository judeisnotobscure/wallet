import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
});

export const createWallet = async (currency) => {
  const response = await api.post('/wallet/create', { currency });
  return response.data;
};

export const recoverWallet = async (currency, mnemonic) => {
  const response = await api.post('/wallet/recover', { currency, mnemonic });
  return response.data;
};

export const checkBalance = async (walletId) => {
  const response = await api.post('/wallet/check_balance', { wallet_id: walletId });
  return response.data;
};

export const sendTransaction = async (walletId, toAddress, amount) => {
  const response = await api.post('/wallet/send_transaction', { wallet_id: walletId, to_address: toAddress, amount });
  return response.data;
};
