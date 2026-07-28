/**
 * Configuración de la aplicación
 * 
 * Centraliza todas las configuraciones del proyecto.
 */

import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

export const config = {
    // Servidor
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',

    // Base de datos (ejemplo para SQL Server)
    database: {
        server: process.env.DB_SERVER || 'localhost',
        database: process.env.DB_NAME || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        options: {
            encrypt: process.env.DB_ENCRYPT === 'true',
            trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
        }
    },

    // JWT (si usas autenticación)
    jwt: {
        secret: process.env.JWT_SECRET || 'default-secret-change-in-production',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },

    // CORS
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
    }
};

export default config;
