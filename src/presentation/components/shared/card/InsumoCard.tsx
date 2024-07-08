/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Api } from '../../../../config/api/api';
import { getCardInsumosData } from '../../../../datasource/cardItems';
import { Status } from '../../../../datasource/entities/status';
import { IsLoadingPage } from '../loading/IsLoadingPage';

export const InsumoCard = () => {
  const [cardData, setcardData] = useState<any>();
  const [status, setstatus] = useState<Status>(Status.notStarted);
  const getData = async () => {
    setstatus(Status.inProgress);
    const resp = await Api.instance.get('/api/insumo/total/insumo');
    const data = await resp.data;
    setstatus(Status.done);
    setcardData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const getInsumosData = getCardInsumosData(
    cardData?.totalInsumos ?? 0,
    cardData?.quantityInsumos ?? 0
  );
  if (status === Status.inProgress) return <IsLoadingPage />;
  return (
    <>
      <div className="flex flex-wrap   mb-4">
        {getInsumosData?.map((e: any, i: number) => {
          return (
            <div key={i} className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                        {e.title}
                      </h5>
                      <span className="font-semibold text-xl text-blueGray-700">
                        {e.data.toLocaleString()}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div
                        style={{ backgroundColor: `${e.color}` }}
                        className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  `}>
                        {<e.icon />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
