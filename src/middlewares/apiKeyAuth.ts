import { Request, Response, NextFunction } from 'express';
import config from '../config';

/**
 * Middleware para validar la presencia y validez del API Key.
 * 
 * Busca la API Key en:
 * 1. Encabezado HTTP `x-api-key`
 * 2. Encabezado HTTP `Authorization` (Formato: `Bearer <key>` o `ApiKey <key>`)
 * 3. Parámetro de consulta URL `?api_key=<key>`
 */
export const apiKeyAuth = (req: Request, res: Response, next: NextFunction): void => {
    const validApiKey = config.apiKey;

    // Verificar si la API Key está configurada en el servidor
    if (!validApiKey) {
        console.warn('[API Key Middleware] Advertencia: API_KEY no está configurada en las variables de entorno.');
        res.status(500).json({
            success: false,
            error: 'Server Configuration Error',
            message: 'La autenticación por API Key no está configurada en el servidor.'
        });
        return;
    }

    // Extraer la API Key de la petición
    let providedApiKey: string | undefined;

    // 1. Encabezado x-api-key
    const headerApiKey = req.headers['x-api-key'];
    if (typeof headerApiKey === 'string') {
        providedApiKey = headerApiKey;
    }

    // 2. Encabezado Authorization
    if (!providedApiKey && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            providedApiKey = authHeader.substring(7).trim();
        } else if (authHeader.startsWith('ApiKey ')) {
            providedApiKey = authHeader.substring(7).trim();
        }
    }

    // 3. Parámetro query ?api_key=...
    if (!providedApiKey && req.query.api_key && typeof req.query.api_key === 'string') {
        providedApiKey = req.query.api_key;
    }

    // Si no se proporcionó ninguna clave
    if (!providedApiKey) {
        res.status(401).json({
            success: false,
            error: 'Unauthorized',
            message: 'Acceso denegado: API Key no proporcionada. Envíe la clave en el encabezado x-api-key.'
        });
        return;
    }

    // Comparar la clave proporcionada con la clave válida
    if (providedApiKey !== validApiKey) {
        res.status(403).json({
            success: false,
            error: 'Forbidden',
            message: 'Acceso denegado: API Key inválida.'
        });
        return;
    }

    next();
};
