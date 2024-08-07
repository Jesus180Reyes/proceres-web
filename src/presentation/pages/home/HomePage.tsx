/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from 'react';
import { CustomButton } from '../../components/shared/button/CustomButton';
import { CustomTableComponent } from '../../components/shared/table/CustomTableComponent';
import { HomeModal } from '../../components/home/HomeModal';
import { Status } from '../../../datasource/entities/status';
import { useInventario } from '../../hooks/inventario/useInventario';
import { CustomCard } from '../../components/shared/card/CustomCard';
import { PdfModal } from '../../components/home/PdfModal';
import { HomeFIlterView } from '../../components/home/HomeFIlterView';
import { Item } from '../../components/shared/dropdown/CustomDropdownComponent';
import { useCategoria } from '../../hooks/categoria/useCategoria';
import { useUser } from '../../hooks/users/useUser';
import '../../../assets/index.less';
import Pagination from 'rc-pagination';

const HomePage = memo(() => {
  const [isPdfModalOpen, setisPdfModalOpen] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [filterCategory, setFilterCategory] = useState<Item>();
  const [filterUser, setFilterUser] = useState<Item>();
  const { categories } = useCategoria();
  const [dates, setdates] = useState([null, null]);
  const { users } = useUser();
  const { inventarioResponse, status, page, totalCount, onNextPage } =
    useInventario({
      filters: {
        categoria: filterCategory?.id,
        startDate: dates[0],
        endDate: dates[1],
        user: filterUser?.id,
      },
    });

  return (
    <>
      <div className="home-container">
        <h1 className="py-4 ml-3 mt-3 text-2xl font-semibold">
          Gestíon de Inventario
        </h1>
        <div>
          <CustomCard />
        </div>
        <HomeFIlterView
          categories={categories}
          setFilterCategory={setFilterCategory}
          setFilterUser={setFilterUser}
          users={users}
          dates={dates}
          setdates={setdates}
        />
        <div className="w-full flex gap-2 items-end justify-end flex-wrap max-lg:flex-col max-lg:items-center max-lg:justify-center max-sm:items-center max-xl:items-center">
          <CustomButton
            title={'Agregar Producto al Inventario'}
            onClick={onOpenModal}
          />
          <CustomButton
            marginRight="mr-3"
            title={'Exportar PDF'}
            onClick={() => setisPdfModalOpen(!isPdfModalOpen)}
          />
        </div>

        <div className="mt-10">
          <Pagination
            showTotal={(total, range) =>
              `${range[0]} - ${range[1]} de ${total} insumos`
            }
            current={page}
            onChange={onNextPage}
            total={totalCount}
            align="end"
          />
        </div>

        <CustomTableComponent
          isLoading={status === Status.inProgress}
          items={inventarioResponse}
        />
        <div className="mt-10 mb-5">
          <Pagination
            showTotal={(total, range) =>
              `${range[0]} - ${range[1]} de ${total} insumos`
            }
            current={page}
            onChange={onNextPage}
            total={totalCount}
            align="end"
          />
        </div>
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
