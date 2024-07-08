/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Api } from "../../../config/api/api";
import { CustomModals } from "../../../config/helpers/modals/custom_modals";
import { Insumo, InsumoResponse } from "../../../datasource/entities/insumo";
import { Status } from "../../../datasource/entities/status";

export const useInsumo = () => {
    const [status, setstatus] = useState<Status>(Status.notStarted);
    const [insumosResponse, setInsumosResponse] = useState<Insumo[]>();
    const getData = async () => {
      try {
        setstatus(Status.inProgress);
        const resp = await Api.instance.get<InsumoResponse>('/api/insumo');
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
      }, []);
  return {
    // * Propiedades
    status,
    insumosResponse,
    // * Metodos
    getData,
  }
}
