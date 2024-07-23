/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';
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
  const [inventarioResponse, setinventarioResponse] = useState<Inventario[]>(
    []
  );
  const [totalCount, settotalCount] = useState<number>(0)
  const [page, setpage] = useState<number>(0);
  const [limit] = useState<number>(10);
  // const memoizedPage = useMemo(() => page, [JSON.stringify(page)]);
  const memoizedPage =  JSON.stringify(page);
  
  const memoizedParams = JSON.stringify(params);

  const getData = useCallback(
    async (): Promise<InventarioResponse> => {
      try {
        setstatus(Status.inProgress);
        const resp = await Api.instance.post<InventarioResponse>(
          `/api/inventario/getAll?page=${page}&limit=${limit}`,
          params
        );
        const data = resp.data;

        setHasMore(data.hasMore);
        settotalCount(data.totalCount);
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
    },
    [memoizedParams, memoizedPage]
  );
  const onNextPage = (page: number) => {
    setpage(page);   
  }
  useEffect(() => {
    getData();
  }, [getData]);

  return {
    // * Propiedades
    status,
    inventarioResponse,
    hasMore,
    page,
    limit,
    totalCount,

    // * Metodos
    getData,
    onNextPage
  };
};
