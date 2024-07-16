import { ChangeEvent, FC } from 'react';

interface Props {
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const DropzoneBox: FC<Props> = ({ onFileChange }) => {
  return (
    <>
      <label className="font-semibold text-sm text-gray-600 pb-1 block">
        Ingresar Imagen del Producto (Opcional)
      </label>
      <div className="border border-dashed rounded-lg border-gray-500  w-full h-[150px] relative ">
        <input
          onChange={onFileChange}
          type="file"
          multiple={false}
          accept="image/jpg,image/png"
          className="relative cursor-pointer  block opacity-0 w-full h-full z-50"
        />

        <div className="text-center flex flex-col h-[150px] justify-center items-center absolute top-0 right-0 left-0 m-auto">
          <div className="w-12 text-2xl">
            <i className="fa-solid fa-cloud-arrow-up text-primary"></i>
          </div>
          <div>
            <h4>
              Arrastra y suelta archivos en cualquier parte para subirlos
              <p>o</p>
            </h4>
            <p>Selecciona Archivo</p>
          </div>
        </div>
      </div>
    </>
  );
};
