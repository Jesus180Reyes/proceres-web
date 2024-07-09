/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import { Api } from '../../../config/api/api';
import { CustomModals } from '../../../config/helpers/modals/custom_modals';
import { Insumo, InsumoResponse } from '../../../datasource/entities/insumo';
import { Status } from '../../../datasource/entities/status';

export const useInsumo = (params?: any) => {
  const [status, setstatus] = useState<Status>(Status.notStarted);
  const [insumosResponse, setInsumosResponse] = useState<Insumo[]>();
  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);

  const getData = async () => {
    try {
      setstatus(Status.inProgress);
      const resp = await Api.instance.get<InsumoResponse>('/api/insumo', {
        params,
      });
      const data = resp.data;
      setInsumosResponse(data.insumos);
      setstatus(Status.done);
      return data;
    } catch (error: any) {
      CustomModals.showCustomModal(
        'Ups! Error inseperado',
        'error',
        error.message
      );
      setstatus(Status.notStarted);
      throw new Error(`Ups! Error inseperado ${error.message}`);
    }
  };

  useEffect(() => {
    getData();
  }, [memoizedParams]);
  return {
    // * Propiedades
    status,
    insumosResponse,
    // * Metodos
    getData,
  };
};
