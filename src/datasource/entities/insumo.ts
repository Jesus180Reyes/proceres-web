import { Usuario } from './responses/inventario_response';
export interface InsumoResponse {
  ok: boolean;
  insumos: Insumo[];
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
