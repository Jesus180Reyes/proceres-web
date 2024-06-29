/* eslint-disable react-refresh/only-export-components */
import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import { lazy } from 'react';
import { PrivateRoute } from '../../presentation/components/interceptors/PrivateRoute';
import AppAuth from '../../AppAuth';
const HomePage = lazy(() => import('../../presentation/pages/home/HomePage'));
const LoginPage = lazy(() => import('../../presentation/pages/auth/LoginPage'));
const InsumosPage = lazy(() => import('../../presentation/pages/insumos/InsumosPage'));
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
          element: (
            <PrivateRoute>
            <HomePage />,
            </PrivateRoute>
          )
        },
        {
          path: '/insumos',
          element: (
            <PrivateRoute>
            <InsumosPage />,
            </PrivateRoute>
          )
        },

        { path: '*', element: <Navigate to="/" /> },
      ],
    },
    {
      path: '/auth',
      element: <AppAuth/>,
      children: [
        {
          path: 'login',
         element: <LoginPage/>
        }
      ]
  },
  { path: '/auth/*', element: <Navigate to='/auth/login' /> },
  ]);
}
