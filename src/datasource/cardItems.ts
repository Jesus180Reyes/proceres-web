import { IconType } from 'react-icons';
import { BiCategory } from 'react-icons/bi';
import { FaAirbnb, FaChartLine } from 'react-icons/fa';
import { FaKitchenSet, FaPlateWheat } from 'react-icons/fa6';
import { IoRestaurantOutline } from 'react-icons/io5';
import { LuShoppingBag } from 'react-icons/lu';
import {
  MdCleanHands,
  MdEmojiFoodBeverage,
  MdOutlineRealEstateAgent,
} from 'react-icons/md';

interface CardItem {
  title: string;
  data: number;
  icon: IconType;
  color?: string;
}

export const getCardItemsData = (
  totalProducts: number,
  totalCantidadProductos: number,
  totalCategorias: number,
  productsOnCocina: number,
  productsOnCafe: number,
  productsOnRestaurant: number,
  productsOnLimpieza: number,
  productsOnAirbnb: number,
  productsOnInmobiliaria: number,
  productsOnPlateria: number,
  productsOnUtensillo: number
): CardItem[] => {
  const cardItems: CardItem[] = [
    {
      title: 'Total Productos',
      icon: FaChartLine,
      data: totalProducts,
      color: '#FF69B4',
    },
    {
      title: 'Cantidad de Productos',
      icon: LuShoppingBag,
      data: totalCantidadProductos,
      color: '#FF5733',
    },
    {
      title: 'Total Categorias',
      icon: BiCategory,
      data: totalCategorias,
      color: '#F08080',
    },
    {
      title: 'Productos en Categoria Cocina',
      icon: FaKitchenSet,
      data: productsOnCocina,
      color: '#FFA500',
    },
    {
      title: 'Productos en Categoria Café',
      icon: MdEmojiFoodBeverage,
      data: productsOnCafe,
      color: '#8B4513',
    },
    {
      title: 'Productos en Categoria Restaurante',
      icon: IoRestaurantOutline,
      data: productsOnRestaurant,
      color: '#87CEEB',
    },
    {
      title: 'Productos en Categoria Limpieza',
      icon: MdCleanHands,
      data: productsOnLimpieza,
      color: '#32CD32',
    },
    {
      title: 'Productos en Categoria Airbnb',
      icon: FaAirbnb,
      data: productsOnAirbnb,
      color: '#DC143C',
    },
    {
      title: 'Productos en Categoria Inmobiliaria',
      icon: MdEmojiFoodBeverage,
      data: productsOnInmobiliaria,
      color: '#3E92CC',
    },
    {
      title: 'Productos en Categoria Plateria',
      icon: MdOutlineRealEstateAgent,
      data: productsOnPlateria,
      color: '#C0C0C0',
    },
    {
      title: 'Productos en Categoria Utensillos',
      icon: FaPlateWheat,
      data: productsOnUtensillo,
      color: '#808080',
    },
  ];
  return cardItems;
};
