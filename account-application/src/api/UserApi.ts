import { NewUser } from '../utils/types';
import axios from './axios';

export const AddUser = async (user: NewUser) => {
  return await axios.post('Users/CreateUser', user);
};
export const GetUsers = async () => {
  return await axios.get('Users');
};
export const GetUser = async (input: string) => {
  return await axios.get(`users/GetUserByEmail/${input}`);
};
export const DeleteUser = async (userId: number) => {
  return await axios.delete(`users/DeleteUser/${userId}`);
};
