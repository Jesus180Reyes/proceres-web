export interface InventarioResponse {
  ok: boolean;
  inventario: Inventario[];
}

export interface Inventario {
  id: number;
  nombre_producto: string;
  cantidad: number;
  categoria_id: number;
  user_id: number;
  observacion_general: string;
  createdAt: Date;
  updatedAt: Date;
  categoria: Categoria;
  usuario: Usuario;
  imgUrl: string | null
}

export interface Categoria {
  id: number;
  nombre: string;
  color: string;
}

export interface Usuario {
  nombre: string;
  email: string;
}

export interface CategoriaResponse {
  ok: boolean;
  categorias: Categoria[];
}
