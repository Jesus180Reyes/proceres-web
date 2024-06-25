import Modal from 'react-responsive-modal';
import { CustomButton } from '../../components/shared/button/CustomButton';
import { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { CustomTextfieldComponent } from '../../components/shared/input/CustomTextfieldComponent';
import { OutlineButtonComponent } from '../../components/shared/button/OutlineButtonComponent';
import {
  CustomDropdownComponent,
  Item,
} from '../../components/shared/dropdown/CustomDropdownComponent';
import { CustomTableComponent } from '../../components/shared/table/CustomTableComponent';

const items: Item[] = [
  {
    id: 1,
    title: 'Cocina',
  },
  {
    id: 2,
    title: 'Restaurante',
  },
];
const HomePage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <div className="home-container">
        <h1 className="py-4 ml-3 mt-3 text-2xl font-semibold">
          Gestíon de Inventario
        </h1>
        <div className="flex    w-full items-end justify-end ">
          <div className="mr-5 ">
            <CustomButton
              title={'Agregar Producto al Inventario'}
              onClick={() => onOpenModal()}
            />
          </div>
        </div>
        <CustomTableComponent />
        <Modal open={open} onClose={onCloseModal} center>
          <div className="m-2 mt-5 mb-4">
            <h2 className="font-semibold">Ingresa los datos Requeridos</h2>
            <p className="italic text-sm text-start">
              En esta pantalla podras agregar cada producto establecido por la
              empresa.
            </p>
          </div>
          <CustomTextfieldComponent
            placeholder="Ejem: Café"
            title={'Ingresa el Nombre del Producto *'}
            onChange={e => console.log(e.target.value)}
          />
          <CustomTextfieldComponent
            typeInput="number"
            title={'Introduce la cantidad de este producto. *'}
            onChange={e => console.log(e.target.value)}
          />
          <CustomDropdownComponent
            title={'Ingresa la Categoria de Estos Productos'}
            items={items}
            onItemClicked={() => console.log('sss')}
          />
          <CustomTextfieldComponent
            placeholder="Ejemplo: El Producto se encuentra en mal estado."
            title={'Observacion General (Opcional)'}
            onChange={e => console.log(e.target.value)}
          />
          <OutlineButtonComponent title={'Enviar Producto al Inventario'} />
        </Modal>
      </div>
    </>
  );
};

export default HomePage;
