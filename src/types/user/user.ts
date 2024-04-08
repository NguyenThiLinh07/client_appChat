export type TUser = {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
  address?: string;
  birthDay?: string;
  phoneNumber?: string;
};

export type TRegister = Omit<TUser, 'avatar'>;

export type TRequestLogout = {
  refreshToken: string;
};

export type TRequestResetPassword = {
  token: string;
  password: string;
};
