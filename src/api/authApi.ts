import {
  TRegister,
  TRequestLogin,
  TRequestLogout,
  TRequestResetPassword,
} from '../types/user/user';
import { axiosClient } from './axiosClient';

export const authApi = {
  register: (data: TRegister) => {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },
  login: (data: TRequestLogin) => {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  logout: (data: TRequestLogout) => {
    const url = '/auth/logout';
    return axiosClient.post(url, data);
  },
  resetPassword: (data: TRequestResetPassword) => {},
};
