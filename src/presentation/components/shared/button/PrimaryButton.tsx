import { FC } from 'react';

interface Props {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}
/**
 * PrimaryButton es un componente de botón reutilizable para aplicaciones React.
 *
 * @param {string} title - El texto que se mostrará dentro del botón.
 * @param {void} [onClick] - La función que se ejecutará cuando se haga clic en el botón.
 * @param {boolean} [disabled] - Indica si el botón está deshabilitado. Cuando está deshabilitado, muestra "Cargando...".
 *
 * @returns {JSX.Element} Un botón estilizado con las propiedades dadas.
 */
export const PrimaryButton: FC<Props> = ({ title, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={disabled}
      className="disabled:bg-gray-300 transition duration-200 mt-4 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
      <span className="mr-2"> {disabled ? 'Cargando...' : title}</span>
    </button>
  );
};
