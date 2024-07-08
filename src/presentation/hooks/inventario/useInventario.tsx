/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import { Api } from '../../../config/api/api';
import {
  Inventario,
  InventarioResponse,
} from '../../../datasource/entities/responses/inventario_response';
import { Status } from '../../../datasource/entities/status';

export const useInventario = (params?: any) => {
  const [status, setstatus] = useState<Status>(Status.notStarted);
  const [inventarioResponse, setinventarioResponse] = useState<Inventario[]>();
  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);


  const getData = async (): Promise<InventarioResponse> => {
    try {
      setstatus(Status.inProgress);
      const resp =
        await Api.instance.get<InventarioResponse>('/api/inventario/', {params});
      const data = resp.data;
      setinventarioResponse(data.inventario);
      setstatus(Status.done);
      return data;
    } catch (error: any) {
      setstatus(Status.notStarted);
      console.log(error);
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, [memoizedParams]);

  return {
    // * Propiedades
    status,
    inventarioResponse,
    // * Metodos
    getData,
  };
};
