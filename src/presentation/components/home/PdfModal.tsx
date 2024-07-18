/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react-responsive-modal/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import Modal from 'react-responsive-modal';
import { capitalize } from '../../../config/extensions/string_extension';
import { PrimaryButton } from '../shared/button/PrimaryButton';
import { CustomDropdownComponent } from '../shared/dropdown/CustomDropdownComponent';
import { CustomTextfieldComponent } from '../shared/input/CustomTextfieldComponent';
import { FC, useState } from 'react';
import { useCategoria } from '../../hooks/categoria/useCategoria';
import { useUser } from '../../hooks/users/useUser';
import { useAppSelector } from '../../store/hooks';
import { Api } from '../../../config/api/api';
import { Status } from '../../../datasource/entities/status';
import { CustomModals } from '../../../config/helpers/modals/custom_modals';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export const PdfModal: FC<Props> = ({ isOpen, onClose }) => {
  const userAuth = useAppSelector(value => value.auth.user?.user);
  const [status, setstatus] = useState<Status>(Status.notStarted);
  const [dates, setdates] = useState([null, null]);
  const { categories } = useCategoria();
  const { users } = useUser();
  const [categoria, setcurrentCategory] = useState<number | undefined>(
    undefined
  );
  const [user, setCurrentUser] = useState<number | undefined>(undefined);

  const onSubmit = async () => {
    try {
      setstatus(Status.inProgress);
      await Api.instance.post('/api/inventario/pdf', {
        categoria,
        user,
        startDate: dates[0],
        endDate: dates[1],
      });
      setstatus(Status.done);
      CustomModals.showCustomModal(
        'Reporte Creado Exitosamente',
        'success',
        `El Reporte se envio al correo: ${userAuth?.email}`
      );
      onCloseModal();
    } catch (error: any) {
      setstatus(Status.notStarted);
      CustomModals.showCustomModal(
        `Ups! Error inesperado: ${error.message}`,
        'error'
      );
      throw new Error(`Ups! Error inesperado: ${error.message}`);
    }
  };
  const onCloseModal = () => {
    setCurrentUser(undefined);
    setcurrentCategory(undefined);
    setdates([null, null]);
    onClose();
  };

  return (
    <>
      <Modal styles={{modal: {borderRadius: '15px'}}} open={isOpen} onClose={onCloseModal} center>
        <div className="m-2 mt-5 mb-4">
          <h2 className="font-semibold">Generar Reporte en PDF</h2>
          <p className="italic text-sm text-start max-h-28 max-w-[450px]">
            Puedes generar un reporte en PDF y enviarlo a tu correo electrónico.
            Utiliza los filtros opcionales para personalizar el contenido del
            reporte.
          </p>
        </div>
        <CustomTextfieldComponent
          disabled
          placeholder={userAuth?.email}
          title={'Este reporte se enviara al correo:'}
          onChange={_ => _}
        />
        <CustomDropdownComponent
          disabled={false}
          title={'Categoria:'}
          items={
            categories?.categorias.map(e => ({
              id: e.id,
              title: capitalize(e.nombre),
            })) ?? []
          }
          onItemClicked={item => setcurrentCategory(item.id)}
        />
        <CustomDropdownComponent
          disabled={false}
          title={'Usuario:'}
          items={
            users.map(e => ({
              id: e.id,
              title: capitalize(e.nombre),
            })) ?? []
          }
          onItemClicked={item => setCurrentUser(item.id)}
        />
        <div className="mt-5">
          <DatePicker
            className="text-left flex  mb-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-secondary "
            selectsRange={true}
            startDate={dates[0] ?? undefined}
            // popperPlacement="bottom"
            endDate={dates[1] ?? undefined}
            preventOpenOnFocus
            placeholderText="Fecha:"
            portalId="root" // Render the popper inside the element with id "root"
            onChange={(update: any) => {
              setdates(update);
            }}
            withPortal
            locale={es as any}
            dateFormat={'dd-MM-yyyy'}
          />
        </div>
        <div className="flex">
        <b className="mr-2 text-sm">Nota:</b>
        <p className="text-sm">
          Si no aplicas filtros, el reporte incluirá toda la información
          disponible.
        </p>
      </div>

        <PrimaryButton
          title={'Generar Reporte PDF'}
          onClick={onSubmit}
          disabled={status === Status.inProgress}
        />
      </Modal>
    </>
  );
};
