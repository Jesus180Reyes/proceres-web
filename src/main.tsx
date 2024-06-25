import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { RouterAdapter } from './config/router/router';
import { IsLoadingPage } from './presentation/components/shared/loading/IsLoadingPage';
const router = RouterAdapter.router;
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<IsLoadingPage/>}>
      
    <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
