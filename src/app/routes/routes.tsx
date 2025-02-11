import React, { Fragment, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IndexedObject, PropsLayout } from '../../types/common';
import { EPath } from './routesConfig';
import { v4 as uuid } from 'uuid';
import { Spin } from 'antd';
import LayoutPage from '../pages/Layout/LayoutPage';

export type RoutesProps = {
  exact?: boolean;
  path: string;
  component: React.FC<{ history: IndexedObject; location: IndexedObject; match: IndexedObject }>;
  auth?: boolean;
  routes?: Array<RoutesProps>;
  layout?: React.FC<PropsLayout>;
};

const RenderRoutes = ({
  routes,
  isAuthenticated,
}: {
  routes: Array<RoutesProps>;
  isAuthenticated: boolean;
}) => {
  return (
    <Suspense
      fallback={
        <div className="spin text-center h-[calc(100%-144px)] w-[calc(100%-600px)] absolute translate-y-1/2">
          <Spin size="large" />
        </div>
      }
    >
      <Routes>
        {routes.map((route) => {
          const LayoutRoute = route.layout ?? Fragment;
          const Component = route.component || <div />;
          if (!!route.auth && !isAuthenticated) {
            return (
              <Route
                key={uuid()}
                path={route.path}
                element={<Navigate key={uuid()} to={EPath.login} replace />}
              />
            );
          }
          return (
            <Route
              key={uuid()}
              path={route.path}
              element={
                <LayoutRoute>
                  {route.routes ? (
                    <RenderRoutes routes={route.routes} isAuthenticated={true} />
                  ) : (
                    <Component history={{}} location={{}} match={{}} />
                  )}
                </LayoutRoute>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export const routes = [
  {
    path: EPath.login,
    component: lazy(() => import('../pages/Login/Login')),
  },
  {
    path: EPath.register,
    component: lazy(() => import('../pages/Register/Register')),
  },
  {
    path: '*',
    layout: LayoutPage,
    component: () => <Navigate to={EPath.home} />,
    routes: [
      {
        path: '/',
        component: lazy(() => import('../pages/Chat/Chat')),
        auth: true,
      },
      {
        path: EPath.home,
        component: lazy(() => import('../pages/Chat/Chat')),
        auth: true,
      },
      {
        path: EPath.profile,
        component: lazy(() => import('../pages/Profile/Profile')),
        auth: true,
      },
    ],
  },
];
export default RenderRoutes;
