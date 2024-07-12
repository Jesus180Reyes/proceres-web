/* eslint-disable @typescript-eslint/no-explicit-any */
import { es } from 'date-fns/locale';
import  { FC, useState } from 'react'
import DatePicker from 'react-datepicker';
import Modal from 'react-responsive-modal';
import { Status } from '../../../datasource/entities/status';
import { CustomDropdownComponent } from '../shared/dropdown/CustomDropdownComponent';
import { CustomTextfieldComponent } from '../shared/input/CustomTextfieldComponent';
import { useAppSelector } from '../../store/hooks';
import { useUser } from '../../hooks/users/useUser';
import { capitalize } from '../../../config/extensions/string_extension';
import { useCategoria } from '../../hooks/categoria/useCategoria';
import { PrimaryButton } from '../shared/button/PrimaryButton';
import { Api } from '../../../config/api/api';
import { CustomModals } from '../../../config/helpers/modals/custom_modals';
interface Props {
    isOpen: boolean;
    onClose: () => void;
}
export const PdfInsumoModal:FC<Props> = ({isOpen,onClose}) => {
  const { users } = useUser();
  const { categories } = useCategoria();

  const userAuth = useAppSelector((value) => value.auth.user?.user)
  const [status, setstatus] = useState<Status>(Status.notStarted)
  const [dates, setdates] = useState([null, null]);
  const [categoria, setcurrentCategory] = useState<number | undefined>(undefined);
  const [user, setCurrentUser] = useState<number | undefined>(undefined);
    const onSubmit = async() => {
        try {
            setstatus(Status.inProgress);
            await Api.instance.post('/api/insumo/pdf', {
            categoria,
            user,
            startDate: dates[0],
            endDate: dates[1],
          });
          setstatus(Status.done);
          CustomModals.showCustomModal('Reporte Creado Exitosamente', 'success', `El Reporte se envio al correo: ${userAuth?.email}`)
          onCloseModal();
        } catch (error: any) {
            setstatus(Status.notStarted);
            CustomModals.showCustomModal(`Ups! Error inesperado: ${error.message}`, 'error');
            throw new Error(`Ups! Error inesperado: ${error.message}`);
          }
    }
    const onCloseModal = () => {
        setCurrentUser(undefined);
        setcurrentCategory(undefined);
        setdates([null, null]);
        onClose();
      }

  return (
    <Modal  center open={isOpen} onClose={onClose}>
          <div className="m-2 mt-5 mb-4">
          <h2 className="font-semibold">Ingresa los datos Requeridos</h2>
          <p className="italic text-sm text-start">
            En esta pantalla podras agregar cada Insumo establecido por la
            empresa.
          </p>
        </div>
        <CustomTextfieldComponent
          title={'Correo Electronico al que se enviara el Correo'}
          value={userAuth?.email ?? ''}
          onChange={(e) => console.log(e.target.value)}
          disabled={true}
        />
        <CustomDropdownComponent
          disabled={status === Status.inProgress}
          title={'Categoria:'}
          items={
            categories?.categorias.map(e => ({
              id: e.id,
              title: capitalize(e.nombre),
            })) ?? []
          }
          onItemClicked={item => console.log(item)}
        />
        <CustomDropdownComponent
          disabled={status === Status.inProgress}
          title={'Usuario:'}
          items={
            users.map(e => ({
              id: e.id,
              title: capitalize(e.nombre),
            })) ?? []
          }
          onItemClicked={item => console.log(item)}
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
        <PrimaryButton title={'Generar Reporte PDF'} onClick={onSubmit}  disabled={status === Status.inProgress}/>

        </Modal>
  )
}
