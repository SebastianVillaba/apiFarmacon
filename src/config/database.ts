/**
 * Configuración de conexión a SQL Server
 */

import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de la conexión
const dbConfig: sql.config = {
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_CERT !== 'false', // true por defecto para desarrollo
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    requestTimeout: 30000  // 30 segundos
};

// Pool de conexiones
let pool: sql.ConnectionPool | null = null;

/**
 * Obtiene el pool de conexiones (singleton)
 */
export const getPool = async (): Promise<sql.ConnectionPool> => {
    if (pool) {
        return pool;
    }

    try {
        pool = await sql.connect(dbConfig);
        console.log('✅ Conexión a SQL Server establecida');
        return pool;
    } catch (error) {
        console.error('❌ Error conectando a SQL Server:', error);
        throw error;
    }
};

/**
 * Cierra el pool de conexiones
 */
export const closePool = async (): Promise<void> => {
    if (pool) {
        await pool.close();
        pool = null;
        console.log('🔌 Conexión a SQL Server cerrada');
    }
};

// Tipo para los parámetros de query
type SqlValue = string | number | boolean | Date | Buffer | null;

interface QueryParam {
    name: string;
    type: sql.ISqlType;
    value: SqlValue;
}

/**
 * Ejecuta un query con parámetros
 */
export const executeQuery = async <T>(
    query: string,
    params?: QueryParam[]
): Promise<sql.IResult<T>> => {
    const connection = await getPool();
    const request = connection.request();

    // Agregar parámetros si existen
    if (params) {
        for (const param of params) {
            request.input(param.name, param.type, param.value);
        }
    }

    return request.query<T>(query);
};

export { sql };
export type { QueryParam };
export default { getPool, closePool, executeQuery };
