/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomButton } from '../../components/shared/button/CustomButton';
import { useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { CustomTableComponent } from '../../components/shared/table/CustomTableComponent';
import { HomeModal } from '../../components/home/HomeModal';
import { Api } from '../../../config/api/api';
import {
  Inventario,
  InventarioResponse,
} from '../../../datasource/entities/responses/inventario_response';
import { Status } from '../../../datasource/entities/status';

const HomePage = () => {
  const [status, setstatus] = useState<Status>(Status.notStarted);
  const [inventarioResponse, setinventarioResponse] = useState<Inventario[]>();

  const getData = async (): Promise<InventarioResponse> => {
    try {
      setstatus(Status.inProgress)
      const resp =
      await Api.instance.get<InventarioResponse>('/api/inventario/');
      const data = resp.data;
      setinventarioResponse(data.inventario);
      setstatus(Status.done)
      return data;
    } catch (error: any) {
      setstatus(Status.notStarted)
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [open, setOpen] = useState<boolean>(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <div className="home-container">
        <h1 className="py-4 ml-3 mt-3 text-2xl font-semibold">
          Gestíon de Inventario
        </h1>
        <div className="flex  w-full items-end justify-end ">
          <div className="mr-5 ">
            <CustomButton
              title={'Agregar Producto al Inventario'}
              onClick={() => onOpenModal()}
            />
          </div>
        </div>
        <CustomTableComponent isLoading={status === Status.inProgress} items={inventarioResponse ?? []} />
        <HomeModal isOpen={open} onClose={onCloseModal} />
      </div>
    </>
  );
};

export default HomePage;
