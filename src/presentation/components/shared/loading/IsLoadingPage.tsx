import { HashLoader } from 'react-spinners';

export const IsLoadingPage = () => {
  return (
    <>
      <div className="w-[100%] min-h-screen flex justify-center items-center flex-col">
        <HashLoader color="#0E483A" size={100} />
        <span className="mt-6 text-xl">Cargando...</span>
      </div>
    </>
  );
};
