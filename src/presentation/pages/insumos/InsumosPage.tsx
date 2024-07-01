/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Api } from '../../../config/api/api';
import { Insumo, InsumoResponse } from '../../../datasource/entities/insumo';
import { CustomButton } from '../../components/shared/button/CustomButton';
import { TableInsumos } from '../../components/shared/table/TableInsumos';
import { Status } from '../../../datasource/entities/status';
import { InsumoModal } from '../../components/insumos/InsumoModal';
import { CustomModals } from '../../../config/helpers/modals/custom_modals';

const InsumosPage = () => {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [status, setstatus] = useState<Status>(Status.notStarted);
  const [insumosResponse, setInsumosResponse] = useState<Insumo[]>();
  const getData = async () => {
    try {
      setstatus(Status.inProgress);
      const resp = await Api.instance.get<InsumoResponse>('/api/insumo');
      const data = resp.data;
      setInsumosResponse(data.insumos);
      console.log(data.insumos);
      setstatus(Status.done);
      return data;
    } catch (error: any) {
      CustomModals.showCustomModal(
        'Ups! Error inseperado',
        'error',
        error.message
      );
      throw new Error(`Ups! Error inseperado ${error.message}`);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="home-container">
        <h1 className="py-4 ml-3 mt-3 text-2xl font-semibold">
          Gestion de Insumos
        </h1>
        <div className="flex  w-full items-end justify-end ">
          <div className="mr-5 ">
            <CustomButton
              title={'Agregar Insumo al Inventario'}
              onClick={() => setisOpen(!isOpen)}
            />
          </div>
        </div>
        <TableInsumos
          isLoading={status === Status.inProgress}
          items={insumosResponse ?? []}
        />
      </div>
      <InsumoModal isOpen={isOpen} onCloseModal={() => setisOpen(!isOpen)} />
    </>
  );
};

export default InsumosPage;
