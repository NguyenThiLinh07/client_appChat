export type TUser = {
  name: string;
  email: string;
  password: string;
  avatar: string;
  address: string;
};

export type TRegister = Omit<TUser, 'avatar' | 'address'>;

export type TRequestLogin = Omit<TUser, 'name' | 'avatar' | 'address'>;

export type TRequestLogout = {
  refreshToken: string;
};

export type TRequestResetPassword = {
  token: string;
  password: string;
};
