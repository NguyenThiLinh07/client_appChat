import Cookies from 'js-cookie';
import { DEFAULT_LANGUAGE, languages } from '../locales/i18n';

export const getTokenFromCookie = () => {
  return Cookies.get('access_token');
};

export const getUserFromCookie = () => {
  return JSON.parse((Cookies.get('user') as string) || '{}');
};

export const saveUserCookie = (data_user: any, expires?: Date) => {
  Cookies.set('user', JSON.stringify(data_user), { expires });
};

export const saveTokenCookie = (token?: string, expires?: Date) => {
  if (token) {
    Cookies.set('access_token', token, { expires });
  }
};

export const saveRefreshTokenCookie = (refresh_token?: string, expires?: Date) => {
  if (refresh_token) {
    Cookies.set('refresh_token', refresh_token, { expires });
  }
};

export const removeUser = () => {
  return Cookies.remove('user');
};

export const removeToken = () => {
  return Cookies.remove('access_token');
};

export const removeRefreshToken = () => {
  return Cookies.remove('refresh_token');
};

export const getRefreshTokenFromCookie = () => {
  return Cookies.get('refresh_token');
};

export const getLanguage = () => {
  const language = localStorage.getItem('i18nextLng');
  return language && languages.includes(language) ? language : DEFAULT_LANGUAGE;
};

export const saveLanguage = (language: string) => {
  if (languages.includes(language)) {
    localStorage.setItem('i18nextLng', language);
  } else {
    localStorage.setItem('i18nextLng', DEFAULT_LANGUAGE);
  }
};
