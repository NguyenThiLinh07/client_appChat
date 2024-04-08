import { TRegister, TRequestLogout, TRequestResetPassword, TUser } from '../types/user/user';
import axiosInstance from './axiosClient';

export const authApi = {
  register: (data: TRegister) => {
    const url = '/auth/register';
    return axiosInstance.post(url, data);
  },
  login: (data: TUser) => {
    const url = '/auth/login';
    console.log('data1', data);
    return axiosInstance.post(url, data);
  },
  loginWithGoogle: (token: string) => {
    const url = `/auth/login-google?tokenId=${token}`;
    return axiosInstance.get(url);
  },
  logout: (data: TRequestLogout) => {
    const url = '/auth/logout';
    return axiosInstance.post(url, data);
  },
  resetPassword: (data: TRequestResetPassword) => {},
};
