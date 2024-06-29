import  { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
interface Props {
    children: ReactNode
}
export const PrivateRoute:FC<Props> = ({children}) => {
    // * Agregar Validacion de Autenticacion
    const authStatus = useAppSelector((state) => state.auth.authenticationStatus);
    
    if(authStatus !== 'authenticated') {
       return  <Navigate to={'/auth/login'} replace/>
    }
  return  children;
}
