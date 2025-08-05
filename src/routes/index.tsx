import renderRoutes from '@/utils/common/routerCommon';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes
} from 'react-router-dom';
import { publicRoutes } from './publicRoutes/publicRoutes';

export const PublicOutletRouter = () => {
  return <Outlet />;
};

interface IProtectedRouterProps {
  isAuth?: boolean;
  children?: React.ReactNode;
}

export const ProtectedRouter: React.FC<IProtectedRouterProps> = ({
  isAuth,
  children
}) => {
  // Trường hợp BE đang deploy
  if (isAuth === undefined) return children || <Outlet />;

  localStorage.removeItem('friendlyRedirect');
  if (!isAuth) {
    localStorage.setItem('friendlyRedirect', window.location.pathname);
    return <Navigate to={''} />;
  }

  return children || <Outlet />;
};

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicOutletRouter />}>
            {renderRoutes(publicRoutes)}
          </Route>

          {/* Private Routes */}
          {/* <Route element={<ProtectedRouter isAuth={false} />}>
            {renderRoutes(protectedRoutes)}
          </Route> */}

          {/* <Route
            path='/internal-server-error'
            element={
              <Suspense>
                <InternalServerError />
              </Suspense>
            }
          />
          <Route
            path='/maintenance-mode'
            element={
              <Suspense>
                <MaintenanceMode />
              </Suspense>
            }
          />

          <Route
            path='*'
            element={
              <Suspense>
                <NotFoundError />
              </Suspense>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
