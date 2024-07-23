import { Usuario } from './responses/inventario_response';
export interface InsumoResponse {
  ok: boolean;
  limit: number;
  offset: number;
  page: number;
  totalCount: number;
  hasMore: boolean;
  insumos: Insumo[];
  totalPages: number;
}
export interface Insumo {
  id: number;
  nombre_producto: string;
  user_id: number;
  cantidad: number;
  observacion_general: string;
  user: Usuario;
  createdAt: Date;
  updatedAt: Date;
}
