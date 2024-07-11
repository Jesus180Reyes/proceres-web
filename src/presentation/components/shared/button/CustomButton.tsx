import { FC } from 'react';

interface Props {
  marginleft?: string;
  marginTop?: string;
  marginRight?: string;
  title: string;
  onClick: () => void;
}
/**
 * CustomButton es un componente de botón reutilizable para aplicaciones React,
 * permitiendo la personalización de los márgenes y el texto del botón usando clases de Tailwind CSS.
 *
 * @param {string} [marginleft='ml-0'] - Clase de Tailwind CSS opcional para el margen izquierdo del botón.
 * @param {string} [marginTop='mt-0'] - Clase de Tailwind CSS opcional para el margen superior del botón.
 * @param {string} [marginRight='mr-0'] - Clase de Tailwind CSS opcional para el margen derecho del botón.
 * @param {string} title - El texto que se mostrará dentro del botón.
 * @param {void} onClick - La función que se ejecutará cuando se haga clic en el botón.
 *
 * @returns {JSX.Element} Un botón estilizado con las propiedades dadas.
 */
export const CustomButton: FC<Props> = ({
  onClick,
  marginRight = 'ml-0',
  marginTop = 'mt-0',
  marginleft = 'ml-0',
  title,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${marginleft} ${marginTop} ${marginRight} inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-primary rounded shadow ripple hover:shadow-lg hover:bg-secondary focus:outline-none`}>
      {title}
    </button>
  );
};
