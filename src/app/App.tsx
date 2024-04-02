import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ConfigProvider } from 'antd';
import './scss/global.scss';
import './scss/override.antds.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import moment from 'moment';
import RenderRoutes, { routes } from './routes/routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types';
import { setAuth } from '../store/auth/authSlice';
import Toast from './common/UIParts/Toast';
import {
  getRefreshTokenFromCookie,
  getTokenFromCookie,
  getUserFromCookie,
  getLanguage,
  saveLanguage,
} from '../helpers/cookies';

// Set language + moment
const language = getLanguage();
saveLanguage(language);
moment.locale(language);

const ConfigProviderCustom = ConfigProvider as any;

export function App() {
  const { i18n } = useTranslation();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnReconnect: false,
        staleTime: 10 * 60 * 1000,
      },
    },
  });

  const dispatch = useDispatch();
  const { authenticated, currentUser } = useSelector((state: RootState) => state.auth);

  const localUser = getUserFromCookie();
  const localToken = getTokenFromCookie();
  const localRefreshToken = getRefreshTokenFromCookie();
  const checkAuthLocal = !!(localToken && localRefreshToken && localUser);

  useEffect(() => {
    if (checkAuthLocal) {
      dispatch(setAuth());
    }
  }, [checkAuthLocal]);

  const isAuthenticated = !!(authenticated && currentUser && Object.keys(currentUser).length);

  return (
    <ConfigProviderCustom
      theme={{
        token: {
          colorPrimary: '#ff4218',
          padding: 8,
        },
      }}
    >
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - ChatApp"
          defaultTitle="ChatApp"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="ChatApp" />
        </Helmet>

        <QueryClientProvider client={queryClient}>
          <Toast />
          <RenderRoutes routes={routes} isAuthenticated={isAuthenticated || checkAuthLocal} />
        </QueryClientProvider>
      </BrowserRouter>
    </ConfigProviderCustom>
  );
}
