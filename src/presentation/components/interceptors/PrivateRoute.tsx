import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const PrivateRoute: FC<Props> = ({ children }) => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  if(!token || !id) return (<Navigate to={'/auth/loading'} replace/>)
  return children;
};
