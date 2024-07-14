/* eslint-disable no-mixed-spaces-and-tabs */

import { FC } from 'react';
import { Inventario } from '../../../../datasource/entities/responses/inventario_response';
import { capitalize } from '../../../../config/extensions/string_extension';
import { IsLoadingPage } from '../loading/IsLoadingPage';
import moment from 'moment';

const columns: string[] = [
  'Codigo',
  'Nombre de Producto',
  'Cantidad',
  'Categoria de Producto',
  'Creado Por:',
  'Fecha de Creacion',
];
interface Props {
  items: Inventario[];
  isLoading: boolean;
}
/**
 * CustomTableComponent es un componente de tabla reutilizable para aplicaciones React,
 * diseñado para mostrar una lista de inventario con columnas personalizadas.
 *
 * @param {Inventario[]} items - Array de objetos de inventario a mostrar en la tabla.
 * @param {boolean} isLoading - Indica si los datos están cargando. Si es true, muestra la página de carga.
 *
 * @returns {JSX.Element} Una tabla estilizada con las propiedades dadas.
 */
export const CustomTableComponent: FC<Props> = ({ items, isLoading }) => {
  if (isLoading) return <IsLoadingPage />;
  if (items.length === 0)
    return (
      <h1 className="text-center mt-2 font-semibold text-lg">
        No hay datos Registrados.
      </h1>
    );
  return (
    <>
      <table className="border-collapse w-full mt-10 animate__animated animate__fadeIn">
        <thead>
          <tr>
            {columns.map((e, i) => {
              return (
                <th
                  key={i}
                  className="p-3 font-bold uppercase bg-gray-200 text-primary border border-gray-300 hidden lg:table-cell">
                  {e}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {items.map((e, i) => {
            // const createdDate = new Date(e.createdAt);
            const createdDate = moment(e.createdAt).local();
            return (
              <tr
                key={i}
                className=" cursor-pointer bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  {e.id}
                </td>
                <td className="w-full lg:w-auto p-3 text-primary text-center border border-b block lg:table-cell relative lg:static">
                  {capitalize(e.nombre_producto)}
                </td>
                <td className="w-full lg:w-auto p-3 text-primary text-center border border-b block lg:table-cell relative lg:static">
                  {e.cantidad}
                </td>
                <td className="w-full lg:w-auto p-3 text-primary text-center border border-b block lg:table-cell relative lg:static">
                  <span
                    style={{ backgroundColor: e.categoria.color }}
                    className="rounded  py-1 px-3 text-xs font-bold">
                    {capitalize(e.categoria.nombre)}
                  </span>
                  {/* <a
                            href="#"
                            className="text-blue-400 hover:text-blue-600 underline">
                            Edit
                          </a>
                          <a
                            href="#"
                            className="text-blue-400 hover:text-blue-600 underline pl-6">
                            Remove
                          </a> */}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  {capitalize(e.usuario.nombre)}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  {createdDate.format('DD-MM-YYYY HH:mm')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
