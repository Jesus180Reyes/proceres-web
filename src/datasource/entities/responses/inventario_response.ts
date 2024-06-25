export interface InventarioResponse {
    ok:         boolean;
    inventario: Inventario[];
}

export interface Inventario {
    id:                  number;
    nombre_producto:     string;
    cantidad:            number;
    categoria_id:        number;
    user_id:             number;
    observacion_general: null | string;
    createdAt:           Date;
    updatedAt:           Date;
    categoria:           Categoria;
    usuario:             Usuario;
}

export interface Categoria {
    id:        number;
    nombre:    string;
    color:    string;
}

export interface Usuario {
    nombre:    string;
    email:     string;
}
