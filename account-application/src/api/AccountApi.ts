import axios from './axios';

export const AddAccount = async (userId: number) => {
  return await axios.post('Accounts/CreateAccount', { UserId: userId });
};
export const GetAccounts = async () => {
  return await axios.get('Accounts');
};
