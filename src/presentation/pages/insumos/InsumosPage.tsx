import { useEffect } from "react";
import { Api } from "../../../config/api/api";
import {  InsumoResponse } from "../../../datasource/entities/insumo";
import { CustomButton } from "../../components/shared/button/CustomButton";

 const InsumosPage = () => {
  const getData = async() => {
    const resp = await Api.instance.get<InsumoResponse>('/api/insumo');
    const data = resp.data;
    console.log(data.insumos)
    return data;

  }
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <>
    <div className="home-container">
        <h1 className="py-4 ml-3 mt-3 text-2xl font-semibold">
          Gestion de Insumos
        </h1>
        <div className="flex  w-full items-end justify-end ">
          <div className="mr-5 ">
            <CustomButton
              title={'Agregar Insumo al Inventario'}
              onClick={()  => console.log('click')}
            />
          </div>
        </div>
        {/* <CustomTableComponent
          isLoading={status === Status.inProgress}
          items={inventarioResponse ?? []}
        /> */}
      </div>
    
    </>
  )
}

export default InsumosPage;
