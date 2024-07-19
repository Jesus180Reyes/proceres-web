/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { CustomButton } from '../../components/shared/button/CustomButton';
import { TableInsumos } from '../../components/shared/table/TableInsumos';
import { Status } from '../../../datasource/entities/status';
import { InsumoModal } from '../../components/insumos/InsumoModal';
import { InsumoCard } from '../../components/shared/card/InsumoCard';
import { useInsumo } from '../../hooks/insumo/useInsumo';
import DatePicker from 'react-datepicker';
import {
  CustomDropdownComponent,
  Item,
} from '../../components/shared/dropdown/CustomDropdownComponent';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { useUser } from '../../hooks/users/useUser';
import { capitalize } from '../../../config/extensions/string_extension';
import { PdfInsumoModal } from '../../components/insumos/PdfInsumoModal';

const InsumosPage = () => {
  const [dates, setdates] = useState([null, null]);

  const [isOpen, setisOpen] = useState<boolean>(false);
  const [filterUser, setFilterUser] = useState<Item>();
  const { insumosResponse, status } = useInsumo({
    startDate: dates[0],
    endDate: dates[1],
    user: filterUser?.id,
  });
  const { users } = useUser();
  const [isPdfModal, setisPdfModal] = useState<boolean>(false);

  return (
    <>
      <div className="home-container">
        <h1 className="py-4 ml-3 mt-3 text-2xl font-semibold">
          Gestion de Insumos
        </h1>
        <div>
          <InsumoCard />
        </div>
        <div className="gap-2 py-4 ml-3 mt-3 text-2xl font-semibold">
          <h3 className="text-2xl ">Filtros</h3>
          <p className="text-lg italic font-normal">
            Aquí puedes filtrar la tabla de contenido por:
          </p>
          <div className="w-full flex gap-4 mt-2 flex-wrap max-sm:justify-center max-xl:justify-center">
            <div className="w-[300px]">
              <CustomDropdownComponent
                disabled={false}
                title={'Usuario:'}
                items={
                  users.map(e => ({
                    id: e.id,
                    title: capitalize(e.nombre),
                  })) ?? []
                }
                onItemClicked={item => {
                  setFilterUser(item);
                }}
              />
            </div>
            <div className="w-[300px]">
              <DatePicker
                className="text-left flex justify-between mb-4 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 "
                selectsRange={true}
                startDate={dates[0] ?? undefined}
                endDate={dates[1] ?? undefined}
                placeholderText="Fecha:"
                onChange={(update: any) => {
                  setdates(update);
                }}
                withPortal
                locale={es as any}
                dateFormat={'dd-MM-yyyy'}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex gap-2 items-end justify-end flex-wrap max-lg:flex-col max-lg:items-center max-lg:justify-center max-sm:items-center max-xl:items-center ">
          <CustomButton
            title={'Agregar Insumo al Inventario'}
            onClick={() => setisOpen(!isOpen)}
          />
          <CustomButton
            marginleft="ml-2"
            marginTop="mt-2"
            title={'Exportar PDF'}
            onClick={() => setisPdfModal(!isPdfModal)}
          />
        </div>
        <TableInsumos
          isLoading={status === Status.inProgress}
          items={insumosResponse ?? []}
        />
      </div>
      <InsumoModal isOpen={isOpen} onCloseModal={() => setisOpen(!isOpen)} />
      <PdfInsumoModal
        isOpen={isPdfModal}
        onClose={() => setisPdfModal(!isPdfModal)}
      />
    </>
  );
};

export default InsumosPage;
