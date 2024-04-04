import { TRegister, TRequestLogout, TRequestResetPassword, TUser } from '../types/user/user';
import { axiosClient } from './axiosClient';

export const authApi = {
  register: (data: TRegister) => {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },
  login: (data: TUser) => {
    const url = '/auth/login';
    console.log('data1', data);
    return axiosClient.post(url, data);
  },
  loginWithGoogle: (token: string) => {
    const url = `/auth/login-google?tokenId=${token}`;
    return axiosClient.get(url);
  },
  logout: (data: TRequestLogout) => {
    const url = '/auth/logout';
    return axiosClient.post(url, data);
  },
  resetPassword: (data: TRequestResetPassword) => {},
};
