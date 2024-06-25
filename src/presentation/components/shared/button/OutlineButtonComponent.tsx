import { FC } from 'react';

interface Props {
  title: string;
  onClick: () => void;
}
export const OutlineButtonComponent: FC<Props> = ({ title, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
      {title}
    </button>
  );
};
