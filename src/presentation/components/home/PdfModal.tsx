/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {  useAppSelector } from '../../store/hooks';
interface Props {
    isOpen: boolean
    onClose: () => void

}
export const PdfModal: FC<Props> = ({isOpen, onClose}) => {
    const user = useAppSelector((value) => value.auth.user?.user);
    const [dates, setdates] = useState([null, null]);
  const { categories } = useCategoria();
  const {users} = useUser();

  return (
    <Modal    open={isOpen} onClose={onClose}>
    <div className=" mt-5 mb-2 w-full">
      <h2 className="font-semibold">Generar Reporte en PDF</h2>
      <p className="italic text-sm text-start mb-4 w-[500px]">
      Puedes generar un reporte en PDF y enviarlo a tu correo electrónico. Utiliza los filtros opcionales para personalizar el contenido del reporte.
      </p>
      <CustomTextfieldComponent disabled placeholder={user?.email} title={'Este reporte se enviara al correo:'} onChange={(e) => console.log(e.target.value)}/>
      <CustomDropdownComponent
      disabled={false}
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
      disabled={false}
      title={'Usuario:'}
      items={
        users.map(e => ({
          id: e.id,
          title: capitalize(e.nombre),
        })) ?? []
      }
      onItemClicked={item => console.log(item)}
    />
   <div className="w-[300px] mt-5">
          <DatePicker
            className="text-left flex  mb-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-secondary "
            selectsRange={true}
            startDate={dates[0] ?? undefined}
            popperPlacement='bottom'
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
       <div className='flex w-[450px]'>
        <b className='mr-2 text-sm' >Nota:</b>
        <p className='text-sm'>Si no aplicas filtros, el reporte incluirá toda la información disponible.</p>
       </div>
      
       <PrimaryButton title={'Generar Reporte PDF'}/>

    </div>
    </Modal>
  )
}
