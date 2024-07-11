/* eslint-disable react-refresh/only-export-components */
import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import { lazy } from 'react';
import AppAuth from '../../AppAuth';
import { PrivateRoute } from '../../presentation/components/interceptors/PrivateRoute';
const HomePage = lazy(() => import('../../presentation/pages/home/HomePage'));
const LoginPage = lazy(() => import('../../presentation/pages/auth/LoginPage'));
const LoadingPage = lazy(
  () => import('../../presentation/pages/loading/LoadingPage')
);
const InsumosPage = lazy(
  () => import('../../presentation/pages/insumos/InsumosPage')
);
const UsersPage = lazy(
  () => import('../../presentation/pages/users/UsersPage')
);
const DashboardPage = lazy(
  () => import('../../presentation/pages/dashboard/DashboardPage')
);
/**
 * RouterAdapter es una clase que configura el enrutador de la aplicación usando react-router-dom.
 * Define las rutas principales y las rutas secundarias de la aplicación.
 */
export class RouterAdapter {
  /**
   * @static {Router} router - El enrutador de la aplicación configurado con las rutas principales y secundarias.
   */
  static router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          path: '/',
          element: <Navigate to={'/auth/loading'} replace />,
        },
        {
          // index: true,
          path: 'home',
          element: (
            <PrivateRoute>
              <HomePage />,
            </PrivateRoute>
          ),
        },
        {
          path: 'insumos',
          element: (
            <PrivateRoute>
              <InsumosPage />,
            </PrivateRoute>
          ),
        },
        {
          path: 'users',
          element: (
            <PrivateRoute>
              <UsersPage />,
            </PrivateRoute>
          ),
        },
        {
          path: 'dashboard',
          element: (
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          ),
        },

        { path: '*', element: <Navigate to="/" /> },
      ],
    },
    {
      path: '/auth',
      element: <AppAuth />,
      children: [
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'loading',
          // index: true,
          element: <LoadingPage />,
        },
      ],
    },
    { path: '/auth/*', element: <Navigate to="/auth/loading" replace /> },
  ]);
}
