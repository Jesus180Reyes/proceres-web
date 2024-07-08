import {  useState } from 'react';
import { CustomButton } from '../../components/shared/button/CustomButton';
import { TableInsumos } from '../../components/shared/table/TableInsumos';
import { Status } from '../../../datasource/entities/status';
import { InsumoModal } from '../../components/insumos/InsumoModal';
import { InsumoCard } from '../../components/shared/card/InsumoCard';
import { useInsumo } from '../../hooks/insumo/useInsumo';

const InsumosPage = () => {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const { insumosResponse, status}  = useInsumo();
  return (
    <>
      <div className="home-container">
        <h1 className="py-4 ml-3 mt-3 text-2xl font-semibold">
          Gestion de Insumos
        </h1>
        <div>
          <InsumoCard/>
        </div>
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
