import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const AuthPrivateRoute: FC<Props> = ({ children }) => {
  return children;
};
