/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState, useCallback } from 'react';
import { Api } from '../../../config/api/api';
import { CustomModals } from '../../../config/helpers/modals/custom_modals';
import { Insumo, InsumoResponse } from '../../../datasource/entities/insumo';
import { Status } from '../../../datasource/entities/status';
interface Params {
  startDate: any;
endDate: any ;
user: number | undefined
page: number;
}
export const useInsumo = (params?: Params) => {
  const [status, setstatus] = useState<Status>(Status.notStarted);
  const [insumosResponse, setInsumosResponse] = useState<Insumo[]>([]);
  const [hasMore, sethasMore] = useState<boolean>(false);
  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);
  const [limit] = useState<number>(10);
  const [totalPages, settotalPages] = useState<number>(0);
  const [totalCount, settotalCount] = useState<number>(0)
  const getData =  useCallback(async () => {
    try {
      setstatus(Status.inProgress);
      const resp = await Api.instance.get<InsumoResponse>(`/api/insumo`, {
        params,
      });

      const data = resp.data;
     
        sethasMore(data.hasMore);
        settotalPages(data.totalPages);
        settotalCount(data.totalCount);
        setInsumosResponse(data.insumos);
        setstatus(Status.done);

      return data;
    } catch (error: any) {
      CustomModals.showCustomModal(
        'Ups! Error inesperado',
        'error',
        error.message
      );
      setstatus(Status.notStarted);
      throw new Error(`Ups! Error inesperado ${error.message}`);
    }
  },[memoizedParams]);

  useEffect(() => {
    getData();
    return () => {
      sethasMore(false);
      setInsumosResponse([]);

    }
  }, [getData]);

  return {
    // * Propiedades
    status,
    insumosResponse,
    hasMore,
    // page,
    limit,
    totalPages,
    totalCount,
    // * Metodos
    getData,
  };
};
