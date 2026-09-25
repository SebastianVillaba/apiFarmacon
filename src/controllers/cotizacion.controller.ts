/**
 * Controller de Cotizaciones
 */
import { Request, Response } from 'express';
import { executeQuery } from '../config/database';

interface ICotizacionRow {
    moneda: string;
    compra: number;
}

/**
 * Obtener cotizaciones de compra por moneda
 * GET /api/cotizacion
 */
export const getCotizaciones = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await executeQuery<ICotizacionRow>(
            `SELECT 'usd' + '_' + rtrim(m.nombreMoneda) as moneda, dc.compra
            FROM detCotiza dc
            INNER JOIN moneda m ON dc.idMoneda = m.idMoneda`
        );

        if (result.recordset.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No se encontraron cotizaciones'
            });
            return;
        }

        const data = Object.fromEntries(
            result.recordset.map((row) => [row.moneda, row.compra])
        );

        res.status(200).json({
            success: true,
            data,
            message: 'Cotizaciones obtenidas correctamente'
        });

    } catch (error) {
        console.error('Error en getCotizaciones:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las cotizaciones',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
