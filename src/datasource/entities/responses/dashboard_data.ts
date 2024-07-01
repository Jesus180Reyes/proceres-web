export interface DashboardData {
  ok: boolean;
  totalProducts: number;
  totalQuantityProducts: number;
  category: Category;
}

export interface Category {
  totalCategories: number;
  totalProductsOnCocina: number;
  totalProductsOnCafe: number;
  totalProductsOnRestaurante: number;
  totalProductsOnLimpieza: number;
  totalProductsOnAirbnb: number;
  totalProductsOnInmobiliaria: number;
  totalProductsOnPlateria: number;
  totalProductsOnUtensillos: number;
}
