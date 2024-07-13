/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { useCategoria } from '../../hooks/categoria/useCategoria';
import { capitalize } from '../../../config/extensions/string_extension';
import { useEffect, useState } from 'react';
import { Api } from '../../../config/api/api';
import { Category } from '../../../datasource/entities/responses/dashboard_data';
import { DashboardCard } from '../../components/dashboard/DashboardCard';
import { BarGraphResponse } from '../../../datasource/entities/responses/bargraph_response';

const DashboardPage = () => {
  const { categories } = useCategoria();
  // const {inventarioResponse} = useInventario();
  const categoryNames = categories?.categorias.map(e => capitalize(e.nombre));
  const categoryColors = categories?.categorias.map(e => e.color);
  const [totalProducts, settotalProducts] = useState<Category>();
  const [barGraphResponse, setbarGraphResponse] = useState<BarGraphResponse>();
  // const datesInventario = inventarioResponse?.map(e =>  {
  //     const date = new Date(e.createdAt)
  //   const newDate = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date)
  //   return newDate
  // }

  // );

  const getCardData = async (): Promise<Category> => {
    const resp = await Api.instance.get('/api/inventario/metrics');
    const data = await resp.data;
    settotalProducts(data);

    return data;
  };
  const getBarCard = async (): Promise<BarGraphResponse> => {
    const resp = await Api.instance.get<BarGraphResponse>(
      '/api/inventario/metrics/bar'
    );
    const data = await resp.data;
    setbarGraphResponse(data);

    return data;
  };
  useEffect(() => {
    getCardData();
    getBarCard();
  }, []);
  const data = {
    labels: categoryNames,
    datasets: [
      {
        label: ' Producto en Inventario por Porcentaje',
        data: [
          totalProducts?.totalProductsOnAirbnb,
          totalProducts?.totalProductsOnCafe,
          totalProducts?.totalProductsOnCocina,
          totalProducts?.totalProductsOnInmobiliaria,
          totalProducts?.totalProductsOnLimpieza,
          totalProducts?.totalProductsOnPlateria,
          totalProducts?.totalProductsOnRestaurante,
          totalProducts?.totalProductsOnUtensillos,
        ],
        backgroundColor: categoryColors,
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return ` Producto en Inventario: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };
  const dataBar = {
    labels: barGraphResponse?.months.map(e => {
      const newDate = new Date(e.date);
      return new Intl.DateTimeFormat('es-ES').format(newDate);
    }),
    datasets: [
      {
        label: 'Productos ingresados segun la fecha',
        data: barGraphResponse?.metrics,
        backgroundColor: [
          'rgba(14, 72, 58, 0.2)',
          'rgba(209, 173, 121, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(14, 72, 58)',
          'rgb(209, 173, 121)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="home-container flex flex-wrap justify-evenly items-start  mt-2 ">
        <DashboardCard>
          <div className="flex flex-col">
            <h1 className="font-semibold text-lg text-start">
              Métricas Inventario
            </h1>
            <p className="font-normal italic text-xs mt-2 mb-2">
              Análisis detallado de la distribución del inventario por
              categoría, presentado a través de un gráfico que muestra en
              porcentaje las áreas con mayor asignación de recursos.
            </p>
          </div>
          <div className="w-[400px] h-[400px]">
            <Doughnut options={options} data={data} width={200} height={200} />
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex flex-col">
            <h1 className="font-semibold text-lg">Métricas Inventario</h1>
            <p className="font-normal italic text-xs mt-2 mb-2">
              En este gráfico, se destacan las fechas con mayor inversión, lo
              que permite identificar patrones y tendencias clave en la gestión
              de inventario.
            </p>
          </div>
          <Bar data={dataBar} />
        </DashboardCard>
      </div>
    </>
  );
};

export default DashboardPage;
