/**
 * Ejemplo de Controller
 * 
 * Los controllers manejan la lógica de las peticiones HTTP.
 * Reciben el Request, procesan la lógica y envían el Response.
 */

import { Request, Response } from 'express';

/**
 * Obtener todos los items
 */
export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        // TODO: Implementar lógica
        res.status(200).json({
            success: true,
            data: [],
            message: 'Items obtenidos correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener items',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

/**
 * Obtener un item por ID
 */
export const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // TODO: Implementar lógica
        res.status(200).json({
            success: true,
            data: { id },
            message: 'Item obtenido correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener item',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

/**
 * Crear un nuevo item
 */
export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;

        // TODO: Implementar lógica
        res.status(201).json({
            success: true,
            data: data,
            message: 'Item creado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear item',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

/**
 * Actualizar un item
 */
export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = req.body;

        // TODO: Implementar lógica
        res.status(200).json({
            success: true,
            data: { id, ...data },
            message: 'Item actualizado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar item',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

/**
 * Eliminar un item
 */
export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // TODO: Implementar lógica
        res.status(200).json({
            success: true,
            message: `Item ${id} eliminado correctamente`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar item',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
