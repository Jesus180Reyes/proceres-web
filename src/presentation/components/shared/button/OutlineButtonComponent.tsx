import { FC } from 'react';

interface Props {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}
/**
 * OutlineButtonComponent es un componente de botón reutilizable para aplicaciones React,
 * con un estilo de borde y texto azul, y una opción para estar deshabilitado.
 *
 * @param {string} title - El texto que se mostrará dentro del botón.
 * @param {void} onClick - La función que se ejecutará cuando se haga clic en el botón.
 * @param {boolean} [disabled=false] - Indica si el botón está deshabilitado. Cuando está deshabilitado, muestra "Cargando...".
 *
 * @returns {JSX.Element} Un botón estilizado con las propiedades dadas.
 */
export const OutlineButtonComponent: FC<Props> = ({
  title,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="disabled:bg-gray-300 inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
      <span className="mr-2"> {disabled ? 'Cargando...' : title}</span>
    </button>
  );
};
