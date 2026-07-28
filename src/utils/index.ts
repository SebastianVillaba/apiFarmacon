/**
 * Utilidades y helpers del proyecto
 */

/**
 * Formatea una fecha a string ISO
 */
export const formatDate = (date: Date): string => {
    return date.toISOString();
};

/**
 * Genera un ID único simple
 */
export const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Pausa la ejecución por X milisegundos
 */
export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Valida si un string es un email válido
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Capitaliza la primera letra de un string
 */
export const capitalize = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Elimina propiedades undefined/null de un objeto
 */
export const cleanObject = <T extends object>(obj: T): Partial<T> => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
            (acc as Record<string, unknown>)[key] = value;
        }
        return acc;
    }, {} as Partial<T>);
};

/**
 * Parsea query params de paginación
 */
export const parsePagination = (query: { page?: string; limit?: string }): { page: number; limit: number; offset: number } => {
    const page = Math.max(1, parseInt(query.page || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(query.limit || '10', 10)));
    const offset = (page - 1) * limit;

    return { page, limit, offset };
};
