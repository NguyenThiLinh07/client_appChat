export type TUser = {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
  address?: string;
  birthDay?: string;
  phoneNumber?: string;
  message?: string;
  name?: string;
  online?: boolean;
};

export type TRegister = Omit<TUser, 'avatar'>;

export type TRequestLogout = {
  refreshToken: string;
};

export type TRequestResetPassword = {
  token: string;
  password: string;
};
