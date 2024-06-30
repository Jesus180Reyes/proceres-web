import Modal from "react-responsive-modal"
import { PrimaryButton } from "../shared/button/PrimaryButton"
import { CustomTextfieldComponent } from "../shared/input/CustomTextfieldComponent"
import { FC } from "react"
interface Props {
    isOpen: boolean;
    onCloseModal: () => void;
}
export const InsumoModal: FC<Props> = ({isOpen, onCloseModal}) => {
  return (
    <>
      <Modal open={isOpen} onClose={onCloseModal} center>
        <div className="m-2 mt-5 mb-4">
          <h2 className="font-semibold">Ingresa los datos Requeridos</h2>
          <p className="italic text-sm text-start">
            En esta pantalla podras agregar cada Insumo establecido por la
            empresa.
          </p>
        </div>
        <CustomTextfieldComponent
         
          errorMsg="El nombre de Producto es Obligatorio"
          placeholder="Ejem: Café"
          title={'Ingresa el Nombre del Insumo *'}
          name="nombre_producto"
          onChange={(e) => console.log(e.target.value)}
        //   value={values.nombre_producto}
        />
        <CustomTextfieldComponent
        
          typeInput="number"
          title={'Introduce la cantidad de este Insumo. *'}
          name="cantidad"
          onChange={(e) => console.log(e.target.value)}
        //   value={values.cantidad}
        />
        {/* <CustomDropdownComponent
        //   disabled={status === Status.inProgress}
          title={'Ingresa la Categoria de Estos Productos'}
          items={
            categories?.categorias.map(e => ({
              id: e.id,
              title: capitalize(e.nombre),
            })) ?? []
          }
          onItemClicked={item => setCurrentCategorie(item)}
        /> */}
        <CustomTextfieldComponent
          placeholder="Ejemplo: El Producto se encuentra en mal estado."
          title={'Observacion General (Opcional)'}
          name="observacion_general"
          onChange={(e) => console.log(e.target.value)}
        //   value={values.observacion_general}
        />
        <PrimaryButton
        //   onClick={}
        //   disabled={status === Status.inProgress}
          title={'Enviar Insumo al Inventario'}
        />
      </Modal>
    </>
  )
}
