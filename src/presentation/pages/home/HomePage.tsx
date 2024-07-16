/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from 'react';
import { CustomButton } from '../../components/shared/button/CustomButton';
import { CustomTableComponent } from '../../components/shared/table/CustomTableComponent';
import { HomeModal } from '../../components/home/HomeModal';
import { Status } from '../../../datasource/entities/status';
import { useInventario } from '../../hooks/inventario/useInventario';
import { CustomCard } from '../../components/shared/card/CustomCard';
import {
  CustomDropdownComponent,
  Item,
} from '../../components/shared/dropdown/CustomDropdownComponent';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import { useCategoria } from '../../hooks/categoria/useCategoria';
import { capitalize } from '../../../config/extensions/string_extension';
import { useUser } from '../../hooks/users/useUser';
import { PdfModal } from '../../components/home/PdfModal';

const HomePage = memo(() => {
  const [isPdfModalOpen, setisPdfModalOpen] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<Item>();
  const [filterUser, setFilterUser] = useState<Item>();
  const [dates, setdates] = useState([null, null]);
  const { status, inventarioResponse } = useInventario({
    filters: {
      categoria: filterCategory?.id,
      startDate: dates[0],
      endDate: dates[1],
      user: filterUser?.id,
    },
  });
  const { users } = useUser();

  const [open, setOpen] = useState<boolean>(false);
  const { categories } = useCategoria();
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
        <div className="gap-2 py-4 ml-3 mt-3 text-2xl font-semibold">
          <h3 className="text-2xl ">Filtros</h3>
          <p className="text-lg italic font-normal">
            Aquí puedes filtrar la tabla de contenido por:
          </p>
          <div className="w-full flex gap-4 mt-2 flex-wrap max-sm:justify-center max-xl:justify-center">
            <div className="w-[300px]">
              <CustomDropdownComponent
                disabled={false}
                title={'Categoria:'}
                items={
                  categories?.categorias.map(e => ({
                    id: e.id,
                    title: capitalize(e.nombre),
                  })) ?? []
                }
                onItemClicked={item => {
                  setFilterCategory(item);
                }}
              />
            </div>
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
                onItemClicked={item => setFilterUser(item)}
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
        <div className="flex  w-full items-end justify-end ">
          <div className="mr-5">
            <CustomButton
              title={'Agregar Producto al Inventario'}
              onClick={onOpenModal}
            />
            <CustomButton
              marginleft="ml-2"
              marginTop="mt-2"
              title={'Exportar PDF'}
              onClick={() => setisPdfModalOpen(!isPdfModalOpen)}
            />
          </div>
        </div>
        <CustomTableComponent
          isLoading={status === Status.inProgress}
          items={inventarioResponse ?? []}
        />
      </div>
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setisPdfModalOpen(!isPdfModalOpen)}
      />
      <HomeModal isOpen={open} onClose={onCloseModal} />
    </>
  );
});

export default HomePage;
