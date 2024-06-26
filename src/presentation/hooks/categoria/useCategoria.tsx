/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import { Api } from '../../../config/api/api';
import { CategoriaResponse } from '../../../datasource/entities/responses/inventario_response';

export const useCategoria = () => {
  const [categories, setCategories] = useState<CategoriaResponse>();
  const getCategories = async (): Promise<void> => {
    try {
      const resp = await Api.instance.get<CategoriaResponse>('/api/categoria/');
      const data = resp.data;
      setCategories(data);
    } catch (error: any) {
      console.log(error);
      throw new Error(`Algo paso ${error.message}`);
    }
  };

  useEffect(() => {
    getCategories();
  });
  return {
    // * Propiedades
    categories,
    // * Metodos
    getCategories,
  };
};
