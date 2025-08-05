import React from 'react';
import { Route } from 'react-router-dom';

import DefaultLayout from '@/layouts/DefaultLayout';
import PageWrapper from './PageWrapper';
import { IRoute } from '@/@types/routes';
import LogoutRequiredLayout from '@/layouts/LogoutRequiredLayout';

const renderRoutes = (routes: IRoute[]) => {
  return routes.map((route) => {
    let Layout;
    if (route.layout === undefined) {
      Layout = DefaultLayout;
    } else if (route.layout === null) {
      Layout = React.Fragment;
    } else {
      Layout = route.layout;
    }

    let { path } = route;

    if (route.params) {
      path = `${route.path}/${route.params}`;
    }

    return (
      <Route
        key={route.path}
        path={path}
        element={
          route.logoutRequired ? (
            <LogoutRequiredLayout>
              <Layout>
                <PageWrapper
                  title={route.title}
                  documentTitle={route.documentTitle}
                >
                  {route.page}
                </PageWrapper>
              </Layout>
            </LogoutRequiredLayout>
          ) : (
            <Layout>
              <PageWrapper
                title={route.title}
                documentTitle={route.documentTitle}
              >
                {route.page}
              </PageWrapper>
            </Layout>
          )
        }
      />
    );
  });
};

export default renderRoutes;
