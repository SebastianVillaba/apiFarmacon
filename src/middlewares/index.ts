/**
 * Middlewares personalizados
 * 
 * Los middlewares interceptan las peticiones antes de llegar al controller.
 * Útiles para validación, autenticación, logging, etc.
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para validar que el cuerpo de la petición no esté vacío
 */
export const validateBodyNotEmpty = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({
            success: false,
            message: 'El cuerpo de la petición no puede estar vacío'
        });
        return;
    }
    next();
};

/**
 * Middleware para validar que existan ciertos campos requeridos
 */
export const validateRequiredFields = (fields: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const missingFields = fields.filter(field => !(field in req.body));

        if (missingFields.length > 0) {
            res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos',
                error: `Campos faltantes: ${missingFields.join(', ')}`
            });
            return;
        }
        next();
    };
};

/**
 * Middleware para validar que el ID en params sea un número válido
 */
export const validateIdParam = (req: Request, res: Response, next: NextFunction): void => {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        res.status(400).json({
            success: false,
            message: 'ID inválido',
            error: 'El ID debe ser un número válido'
        });
        return;
    }
    next();
};

/**
 * Middleware para logging de peticiones (ejemplo adicional a morgan)
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));
    next();
};

/**
 * Middleware de autenticación (placeholder - implementar según necesidad)
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            success: false,
            message: 'No autorizado',
            error: 'Token de autorización no proporcionado'
        });
        return;
    }

    // TODO: Validar el token JWT aquí
    // const token = authHeader.split(' ')[1];
    // try {
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   req.user = decoded;
    //   next();
    // } catch (error) {
    //   res.status(401).json({ success: false, message: 'Token inválido' });
    // }

    next();
};

export { apiKeyAuth } from './apiKeyAuth';
