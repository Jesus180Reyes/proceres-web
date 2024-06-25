import Modal from "react-responsive-modal";
import { OutlineButtonComponent } from "../shared/button/OutlineButtonComponent";
import { CustomDropdownComponent, Item } from '../shared/dropdown/CustomDropdownComponent';
import { CustomTextfieldComponent } from "../shared/input/CustomTextfieldComponent";
import { FC } from "react";

interface Props {
    isOpen: boolean;
    onClose: ()=> void;
    items: Item[]
}
export const HomeModal: FC<Props> = ({isOpen, onClose,items}) => {
  return (
    <>
     <Modal open={isOpen} onClose={onClose} center>
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
    
    </>
  )
}
