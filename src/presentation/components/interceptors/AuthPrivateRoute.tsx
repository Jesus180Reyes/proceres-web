import { FC, ReactNode } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const AuthPrivateRoute: FC<Props> = ({ children }) => {
  const authStatus = useAppSelector(state => state.auth.authenticationStatus);
  if (authStatus === 'authenticated') {
    return <Navigate to={'/'} replace />;
  }

  return children;
};
