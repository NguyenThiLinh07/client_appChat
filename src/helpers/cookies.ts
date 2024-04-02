import Cookies from 'js-cookie';
import { DEFAULT_LANGUAGE, languages } from '../locales/i18n';
export const getTokenFromCookie = () => {
  return Cookies.get('access_token');
};

export const getUserFromCookie = () => {
  return Cookies.get('user');
};

export const saveUserCookie = (data_user: any, expires?: number) => {
  Cookies.set('user', JSON.stringify(data_user), { expires });
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
