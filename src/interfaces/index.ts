/**
 * Interfaces y Types del proyecto
 * 
 * Aquí van las definiciones de tipos para TypeScript.
 * Pueden separarse en archivos individuales según el módulo.
 */

// ============================================================
// INTERFACES DE RESPUESTA
// ============================================================

/**
 * Respuesta estándar de la API
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

/**
 * Respuesta paginada
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// ============================================================
// INTERFACES DE ENTIDADES (EJEMPLOS)
// ============================================================

/**
 * Usuario base
 */
export interface IUser {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Producto base
 */
export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

// ============================================================
// TYPES UTILITARIOS
// ============================================================

/**
 * Hace todas las propiedades opcionales excepto las especificadas
 */
export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

/**
 * Omite propiedades de timestamps
 */
export type WithoutTimestamps<T> = Omit<T, 'createdAt' | 'updatedAt'>;

/**
 * Para crear nuevas entidades (sin id ni timestamps)
 */
export type CreateDto<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Para actualizar entidades (todo opcional excepto lo que se requiera)
 */
export type UpdateDto<T> = Partial<WithoutTimestamps<T>>;
