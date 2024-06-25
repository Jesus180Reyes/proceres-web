import { HashLoader } from "react-spinners"


export const IsLoadingPage = () => {
  return (
    <>
    <div className="w-[100vw] h-[100vh] flex justify-center items-center flex-col">
    <HashLoader color="green" size={100}/>
    <span className="mt-6 text-xl">Cargando...</span>
    </div>
    
    </>
  )
}
