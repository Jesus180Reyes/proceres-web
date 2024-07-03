import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const PrivateRoute: FC<Props> = ({ children }) => {
  return children;
};
