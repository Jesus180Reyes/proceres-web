import { FC, useState } from 'react';

export interface Item {
  id: number;
  title: string;
}
interface Props {
  title: string;
  items: Item[];
  onItemClicked: (item: Item) => void;
  disabled: boolean;
}
/**
 * Componente de Dropdown personalizado .
 * Hecho Por Jesus Reyes.
 * @param title - Titulo de Input.
 * @param items - Items Totales.
 * @param onItemClicked - Función llamada cuando cambia el valor del input ```(item) => void```.
 * @param disabled - Deshabilita el Boton cuando es True```.
 
 */
export const CustomDropdownComponent: FC<Props> = ({
  title,
  items,
  onItemClicked,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValueSelected, setCurrentValueSelected] = useState<string>();
  const itemClickedFunction = (item: Item) => {
    onItemClicked.call(item, item);
    setCurrentValueSelected(item.title);
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="">
        <button
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          id="dropdown-button"
          className="text-left flex justify-between mb-4 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
          {currentValueSelected !== undefined ? currentValueSelected : title}
          <i className="fa-solid fa-angle-down"></i>
        </button>
        {isOpen && (
          <div
            id="dropdown-menu"
            className=" max-h-[200px] overflow-y-auto  mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-2 p-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-button">
              {items.length === 0 && 'No Items para agregar.'}
              {items.map((e, i) => {
                return (
                  <a
                    onClick={() => itemClickedFunction(e)}
                    key={i}
                    className="flex  rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                    role="menuitem">
                    {e.title}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
