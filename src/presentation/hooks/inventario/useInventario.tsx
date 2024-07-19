/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useCallback, useEffect, useState } from 'react';
import { Api } from '../../../config/api/api';
import {
  Inventario,
  InventarioResponse,
} from '../../../datasource/entities/responses/inventario_response';
import { Status } from '../../../datasource/entities/status';
import { CustomModals } from '../../../config/helpers/modals/custom_modals';

export const useInventario = (params?: any) => {
  const [status, setstatus] = useState<Status>(Status.notStarted);
  const [inventarioResponse, setinventarioResponse] = useState<Inventario[]>();
  // const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);
  const memoizedParams = JSON.stringify(params);

  const getData =   useCallback( async(): Promise<InventarioResponse> => {
    try {
      setstatus(Status.inProgress);
      const resp = await Api.instance.post<InventarioResponse>(
        '/api/inventario/getAll',
        params
      );
      console.log(params)
      const data = resp.data;
      setinventarioResponse(data.inventario);
      setstatus(Status.done);
      return data;
    } catch (error: any) {
      setstatus(Status.notStarted);
      CustomModals.showCustomModal(
        'Ups! Error inesperado',
        'error',
        error.message
      );
      throw new Error(error.message);
    }
  }, [memoizedParams]);
  useEffect(() => {
    getData();
  }, [getData]);

  return {
    // * Propiedades
    status,
    inventarioResponse,
    // * Metodos
    getData,
  };
};
