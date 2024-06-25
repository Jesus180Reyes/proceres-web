/* eslint-disable react-refresh/only-export-components */
import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import { lazy } from 'react';

const HomePage = lazy(() => import('../../presentation/pages/home/HomePage'));

export class RouterAdapter {
  static router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          path: '/',
          element: <HomePage />,
        },

        { path: '*', element: <Navigate to="/" /> },
      ],
    },
    // {
    //   path: '/auth',
    //   element: <Auth />,
    //   children: [
    //     // {
    //     //   path: 'paciente/login',
    //     //   element: <PacienteLoginPage />,
    //     // },
    //     {
    //       path: 'trabajadores/login',
    //       element: <TrabajadoresLoginPage />,
    //     },
    //     // {
    //     //   path: 'seleccionarRol',
    //     //   element: <SelectRolePage />,
    //     // },

    //     { path: '*', element: <Navigate to='/auth/paciente/login' /> },
    //     { path: '/auth/*', element: <Navigate to='/auth/paciente/login' /> },
    //   ],
    // },
  ]);
}
