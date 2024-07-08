/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Api } from '../../../config/api/api';
import { User } from '../../../datasource/entities/responses/loginauth_response';

export const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const getUsers = async (): Promise<void> => {
    try {
      const resp = await Api.instance.get('/api/auth/user');
      const data = resp.data;
      setUsers(data.users);
    } catch (error: any) {
      throw new Error(`Algo paso ${error.message}`);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return {
    // * Propiedades
    users,
    // * Metodos
  };
};
