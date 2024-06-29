import  { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
interface Props {
    children: ReactNode
}
export const PrivateRoute:FC<Props> = ({children}) => {
    // * Agregar Validacion de Autenticacion
    const isAuth = true;
    if(!isAuth) {
       return  <Navigate to={'/auth/login'} replace/>
    }
  return  children;
}
