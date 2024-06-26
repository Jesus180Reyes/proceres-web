/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from 'react-responsive-modal';
import {
  CustomDropdownComponent,
  Item,
} from '../shared/dropdown/CustomDropdownComponent';
import { CustomTextfieldComponent } from '../shared/input/CustomTextfieldComponent';
import { FC, useEffect, useState } from 'react';
import { Api } from '../../../config/api/api';
import { CategoriaResponse } from '../../../datasource/entities/responses/inventario_response';
import { capitalize } from '../../../config/extensions/string_extension';
import { useForm } from '../../hooks/form/useForm';
import { PrimaryButton } from '../shared/button/PrimaryButton';
import { Status } from '../../../datasource/entities/status';
import { CustomModals } from '../../../config/helpers/modals/custom_modals';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export const HomeModal: FC<Props> = ({ isOpen, onClose }) => {
  const [status, setstatus] = useState<Status>(Status.notStarted);
  const [hasInputError, setHasInputError] = useState<boolean>(false)
  const { values, handleChange, resetForm } = useForm({
    nombre_producto: '',
    cantidad: 0,
    observacion_general: '',
  });
  const [categories, setCategories] = useState<CategoriaResponse>();
  const [currentCategorie, setCurrentCategorie] = useState<Item>();
  const getCategories = async (): Promise<void> => {
    try {
      const resp = await Api.instance.get<CategoriaResponse>('/api/categoria/');
      const data = resp.data;
      setCategories(data);

    } catch (error: any) {
      console.log(error);
      throw new Error(`Algo paso ${error.message}`);
    }
  };
  const createProduct = async () => {
    if(values.nombre_producto.length === 0 || values.cantidad <= 0 )return setHasInputError(true);
    if(currentCategorie === undefined)return CustomModals.showCustomModal('La Categoria del producto es Obligatoria', 'info');
    try {
      setstatus(Status.inProgress)
       await Api.instance.post('/api/inventario', {
        nombre_producto: values.nombre_producto,
        cantidad: values.cantidad,
        observacion_general: values.observacion_general,
        categoria_id: currentCategorie?.id,
        user_id: 1,
      });
      resetForm();
      setHasInputError(false)
      setCurrentCategorie(undefined);
      setstatus(Status.done);
      CustomModals.showCustomModal('Producto agregado al inventario Exitosamente!!', 'success');
    } catch (error:any) {
      setstatus(Status.notStarted);
      CustomModals.showCustomModal(`Ups! Error inesperado ${error.message}`, 'error');
    }
  };
  useEffect(() => {
    getCategories();
  }, );
  const onSubmit = async () => {
    await createProduct();
  };

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
          disabled={status === Status.inProgress}
          error={values.nombre_producto.length <=0 &&hasInputError}
          errorMsg='El nombre de Producto es Obligatorio'
          placeholder="Ejem: Café"
          title={'Ingresa el Nombre del Producto *'}
          name="nombre_producto"
          onChange={handleChange}
          value={values.nombre_producto}
        />
        <CustomTextfieldComponent
          disabled={status === Status.inProgress}
          errorMsg='La Cantidad de Producto es Obligatorio'
          error={values.cantidad <=0 &&hasInputError}
          typeInput="number"
          title={'Introduce la cantidad de este producto. *'}
          name="cantidad"
          onChange={handleChange}
          value={values.cantidad}
        />
        <CustomDropdownComponent
        disabled={status === Status.inProgress}
          title={'Ingresa la Categoria de Estos Productos'}
          items={
            categories?.categorias.map(e => ({
              id: e.id,
              title: capitalize(e.nombre),
            })) ?? []
          }
          onItemClicked={item => setCurrentCategorie(item)}
        />
        <CustomTextfieldComponent
          placeholder="Ejemplo: El Producto se encuentra en mal estado."
          title={'Observacion General (Opcional)'}
          name="observacion_general"
          onChange={handleChange}
          value={values.observacion_general}
        />
        <PrimaryButton
          onClick={onSubmit}
          disabled={status === Status.inProgress}
          title={'Enviar Producto al Inventario'}
        />
      </Modal>
    </>
  );
};
