/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Api } from '../../../config/api/api';
import { LoginAuthResponse } from '../../../datasource/entities/responses/loginauth_response';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/slices/auth/auth';

interface Props {
  children: ReactNode;
}

export const PrivateRoute: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const getData =async () => {
    const resp = await Api.instance.get<LoginAuthResponse>(
      `/api/auth/user/${id}`
    );
    const data = resp.data;
    dispatch(login(data));
  }
  useEffect(() => {
    if(token || id) {
      getData();
    }
    
    
  }, [])
  if(!token || !id) return (<Navigate to={'/auth/loading'} replace/>)
    
  return children;
};
