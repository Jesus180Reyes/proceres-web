/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useMemo, useEffect } from 'react';
import Modal from 'react-responsive-modal';
import { Api } from '../../../config/api/api';
import { capitalize } from '../../../config/extensions/string_extension';
import { Inventario } from '../../../datasource/entities/responses/inventario_response';
import { Status } from '../../../datasource/entities/status';
import { DropzoneImagePreview } from '../shared/dropzone_file/DropzoneImagePreview';
import { CustomTextfieldComponent } from '../shared/input/CustomTextfieldComponent';
import { IsLoadingPage } from '../shared/loading/IsLoadingPage';

interface PropsModal {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ElementInsumoModal: FC<PropsModal> = ({ id, isOpen, onClose }) => {
  const [status, setstatus] = useState<Status>(Status.notStarted);
  const [inventarioResponse, setinventarioResponse] = useState<Inventario>();
  const memoizedParams = useMemo(() => id, [id]);
  const onClickSeeMore = async () => {
    if (id <= 0) return;
    setstatus(Status.inProgress);
    const resp = await Api.instance.get(`/api/inventario/${id}`);
    const data = resp.data;
    setinventarioResponse(data.inventario);
    setstatus(Status.done);
  };
  useEffect(() => {
    onClickSeeMore();
    return () => {
      setinventarioResponse(undefined);
    };
  }, [memoizedParams]);

  return (
    <>
      <Modal styles={{modal: {borderRadius: '15px'}}} center open={isOpen} onClose={onClose}>
        {status === Status.inProgress ? (
          <IsLoadingPage />
        ) : (
          <>
            <div className="m-2 mt-5 mb-4">
              <h2 className="font-semibold">
                Información Detallada del Producto
              </h2>
              <p className="italic text-sm text-start max-h-28 max-w-[450px]">
                Revisa la información completa del producto seleccionado. Esta
                sección incluye el nombre, cantidad, categoría, observaciones
                adicionales y el usuario responsable de su registro.
              </p>
            </div>
            <CustomTextfieldComponent
              disabled
              title={'Nombre del Producto'}
              name="nombre_producto"
              onChange={_ => _}
              value={capitalize(inventarioResponse?.nombre_producto || '')}
            />
            <CustomTextfieldComponent
              disabled
              title={'Cantidad de este producto'}
              onChange={_ => _}
              value={inventarioResponse?.cantidad.toString()}
            />
            <CustomTextfieldComponent
              disabled
              title={'Categoria de este producto'}
              onChange={_ => _}
              value={capitalize(inventarioResponse?.categoria.nombre || '')}
            />
            <CustomTextfieldComponent
              disabled
              title={'Observacion General'}
              onChange={_ => _}
              value={
                inventarioResponse?.observacion_general
                  ? inventarioResponse?.observacion_general
                  : 'No se asignó ninguna Observacion'
              }
            />
            <CustomTextfieldComponent
              disabled
              title={'Este Producto lo registro el Usuario:'}
              onChange={_ => _}
              value={capitalize(inventarioResponse?.usuario.nombre || '')}
            />

            {inventarioResponse?.imgUrl ? (
              <DropzoneImagePreview
                filePreview={inventarioResponse.imgUrl}
                name={inventarioResponse.nombre_producto}
              />
            ) : (
              <p className="font-semibold text-sm text-gray-600 pb-1 block">
                No se registró ninguna Imagen.
              </p>
            )}
          </>
        )}
      </Modal>
    </>
  );
};
