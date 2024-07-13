import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'animate.css';
import { RouterProvider } from 'react-router-dom';
import { RouterAdapter } from './config/router/router';
import { IsLoadingPage } from './presentation/components/shared/loading/IsLoadingPage';
import { Provider } from 'react-redux';
import { store } from './presentation/store/store';
const router = RouterAdapter.router;
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<IsLoadingPage />}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  </React.StrictMode>
);
