/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "react-responsive-modal"
import { PrimaryButton } from "../shared/button/PrimaryButton"
import { CustomTextfieldComponent } from "../shared/input/CustomTextfieldComponent"
import { FC, useState } from "react"
import { Api } from "../../../config/api/api";
import { useForm } from "../../hooks/form/useForm";
import { CustomModals } from "../../../config/helpers/modals/custom_modals";
import { Status } from "../../../datasource/entities/status";
interface Props {
    isOpen: boolean;
    onCloseModal: () => void;
}
export const InsumoModal: FC<Props> = ({isOpen, onCloseModal}) => {
  const [status, setstatus] = useState(Status.notStarted);
  const [onInputError, setonInputError] = useState<boolean>(false);
  const {resetForm, values, handleChange} = useForm({
    nombre_producto: '',
    cantidad: 0,
    observacion_general: ''
  });
  const createInsumo = async () => {
    if (values.nombre_producto.length === 0 || values.cantidad <= 0) return setonInputError(true);
    try {
      setstatus(Status.inProgress)
      await Api.instance.post('/api/insumo', values);
      CustomModals.showCustomModal('Insumo Creado Exitosamente', "success");
      setstatus(Status.done)
      resetForm();
    } catch (error:any) {
      setstatus(Status.notStarted)
      console.log(error);
      CustomModals.showCustomModal('Ups! Error no esperado', "error", error.message);
      
    }


  }
  const onClosedModal  = () => {
    resetForm();
    setonInputError(false);
    onCloseModal();
  }
  return (
    <>
      <Modal open={isOpen} onClose={onClosedModal} center>
        <div className="m-2 mt-5 mb-4">
          <h2 className="font-semibold">Ingresa los datos Requeridos</h2>
          <p className="italic text-sm text-start">
            En esta pantalla podras agregar cada Insumo establecido por la
            empresa.
          </p>
        </div>
        <CustomTextfieldComponent
          errorMsg="El nombre de Producto es Obligatorio"
          error={values.nombre_producto.length <= 0 && onInputError}
          placeholder="Ejem: Café"
          title={'Ingresa el Nombre del Insumo *'}
          name="nombre_producto"
          value={values.nombre_producto}
          onChange={handleChange}
          disabled={status === Status.inProgress}
        />
        <CustomTextfieldComponent
          typeInput="number"
          title={'Introduce la cantidad de este Insumo. *'}
          name="cantidad"
          value={values.cantidad}
          error={values.cantidad <= 0 && onInputError}
          errorMsg="La Cantidad de Producto es Obligatorio"
          onChange={handleChange}
          disabled={status === Status.inProgress}
        />
        <CustomTextfieldComponent
          placeholder="Ejemplo: El Producto se encuentra en mal estado."
          title={'Observacion General (Opcional)'}
          name="observacion_general"
          value={values.observacion_general}
          onChange={handleChange}
          disabled={status === Status.inProgress}
        />
        <PrimaryButton
          onClick={createInsumo}
          disabled={status === Status.inProgress}
          title={'Enviar Insumo al Inventario'}
        />
      </Modal>
    </>
  )
}
