/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Api } from '../../../config/api/api';
import {
  Inventario,
  InventarioResponse,
} from '../../../datasource/entities/responses/inventario_response';
import { Status } from '../../../datasource/entities/status';
import { CustomModals } from '../../../config/helpers/modals/custom_modals';

export const useInventario = (params?: any) => {
  const [status, setstatus] = useState<Status>(Status.notStarted);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [inventarioResponse, setinventarioResponse] = useState<Inventario[]>([]);
  const [page,setpage] = useState<number>(0);
  const [limit,] = useState<number>(10)
  // const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);
  // const memoizedPage = useMemo(() => page, [JSON.stringify(page)]);
  const memoizedParams = JSON.stringify(params);
  // const memoizedResponse = JSON.stringify(inventarioResponse);

  const getData = useCallback(async (pageToGo = 1, limitToGo = 10 ): Promise<InventarioResponse> => {
    setpage((prevPage) => prevPage + 1 )
    try {
      setstatus(Status.inProgress);
      const resp = await Api.instance.post<InventarioResponse>(
        `/api/inventario/getAll?page=${pageToGo}&limit=${limitToGo}`,
        params,
      );
      const data = resp.data;
      
      setHasMore(data.hasMore);
      setinventarioResponse((datosAnteriores) => [...datosAnteriores, ...data.inventario] );
      console.log(resp.data)
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
  }, [getData ]);

  return {
    // * Propiedades
    status,
    inventarioResponse,
    hasMore,
    page,
    limit,

    // * Metodos
    getData,
  };
};
