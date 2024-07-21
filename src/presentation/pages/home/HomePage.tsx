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
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const { inventarioResponse, status, hasMore, page, limit,getData } = useInventario({
    filters: {
      categoria: filterCategory?.id,
      startDate: dates[0],
      endDate: dates[1],
      user: filterUser?.id,
    },
  },
);
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
        <InfiniteScroll 
        dataLength={inventarioResponse.length}
        next={ async() => await getData( page,limit + 5)}
        hasMore={hasMore}
        loader={<h4>Cargando...</h4>}
        >
        <CustomTableComponent
          isLoading={status === Status.inProgress && !hasMore}
          items={inventarioResponse}
        />
        </InfiniteScroll>
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
