/* eslint-disable @typescript-eslint/no-explicit-any */
import { es } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { capitalize } from '../../../config/extensions/string_extension';
import {
  CustomDropdownComponent,
  Item,
} from '../shared/dropdown/CustomDropdownComponent';
import 'react-datepicker/dist/react-datepicker.css';
import { CategoriaResponse } from '../../../datasource/entities/responses/inventario_response';
import React, { FC } from 'react';
import { User } from '../../../datasource/entities/responses/loginauth_response';
interface Props {
  categories: CategoriaResponse | undefined;
  setFilterCategory: React.Dispatch<React.SetStateAction<Item | undefined>>;
  setFilterUser: React.Dispatch<React.SetStateAction<Item | undefined>>;
  users: User[];
  dates: null[];
  setdates: React.Dispatch<React.SetStateAction<null[]>>;
}
export const HomeFIlterView: FC<Props> = ({
  categories,
  setFilterCategory,
  setFilterUser,
  users,
  dates,
  setdates,
}) => {
  return (
    <div className="gap-2 py-4 ml-3 mt-3 text-2xl font-semibold">
      <h3 className="text-2xl ">Filtros</h3>
      <p className="text-lg italic font-normal">
        Aquí puedes filtrar la tabla de contenido por:
      </p>
      <div className="w-full flex gap-4 mt-2 flex-wrap max-sm:justify-center max-xl:justify-center">
        <div className="w-[300px]">
          <CustomDropdownComponent
            disabled={false}
            title={'Categoria:'}
            items={
              categories?.categorias.map(e => ({
                id: e.id,
                title: capitalize(e.nombre),
              })) ?? []
            }
            onItemClicked={item => {
              setFilterCategory(item);
            }}
          />
        </div>
        <div className="w-[300px]">
          <CustomDropdownComponent
            disabled={false}
            title={'Usuario:'}
            items={
              users.map(e => ({
                id: e.id,
                title: capitalize(e.nombre),
              })) ?? []
            }
            onItemClicked={item => setFilterUser(item)}
          />
        </div>
        <div className="w-[300px]">
          <DatePicker
            className="text-left flex justify-between mb-4 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 "
            selectsRange={true}
            startDate={dates[0] ?? undefined}
            endDate={dates[1] ?? undefined}
            placeholderText="Fecha:"
            onChange={(update: any) => setdates(update)}
            withPortal
            locale={es as any}
            dateFormat={'dd-MM-yyyy'}
          />
        </div>
      </div>
    </div>
  );
};
