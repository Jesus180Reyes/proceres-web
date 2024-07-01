/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomButton } from '../../components/shared/button/CustomButton';
import { memo, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { CustomTableComponent } from '../../components/shared/table/CustomTableComponent';
import { HomeModal } from '../../components/home/HomeModal';
import { Status } from '../../../datasource/entities/status';
import { useInventario } from '../../hooks/inventario/useInventario';
import { CustomCard } from '../../components/shared/card/CustomCard';

const HomePage = memo(() => {
  const { status, inventarioResponse } = useInventario();
  const [open, setOpen] = useState<boolean>(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <div className="home-container">
        <h1 className="py-4 ml-3 mt-3 text-2xl font-semibold">
          Gestíon de Inventario
        </h1>
        <div className="">
          <CustomCard />
        </div>
        <div className="flex  w-full items-end justify-end ">
          <div className="mr-5 ">
            <CustomButton
              title={'Agregar Producto al Inventario'}
              onClick={onOpenModal}
            />
          </div>
        </div>
        <CustomTableComponent
          isLoading={status === Status.inProgress}
          items={inventarioResponse ?? []}
        />
        <HomeModal isOpen={open} onClose={onCloseModal} />
      </div>
    </>
  );
});

export default HomePage;
