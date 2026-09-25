/**
 * Controller de Productos
 */
import { Request, Response } from 'express';
import { executeQuery, sql } from '../config/database';
import { exec } from 'node:child_process';

// Interface del producto (ajustar según tu tabla)
interface IProducto {
    idProducto: number;
    nombre?: string;
    descripcion?: string;
    precio?: number;
    stock?: IStockProducto[];
    // Agrega más campos según tu tabla
}

interface IStockProducto {
    nombreSucursal: string;
    stockActual: number;
}

interface ICotizacion {
    venta: number;
}
/**
 * Obtener producto por ID
 * GET /api/productos/:id
 */
export const getProductoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        const idProducto = id

        if (idProducto.length==0) {
            res.status(400).json({
                success: false,
                message: 'ID de producto inválido'
            });
            return;
        }

        const result = await executeQuery<any>(
            `SELECT 
                p.idProducto,
                p.codigo,
                p.nombreProducto,
                p.precio,
                rtrim(su.nombreFantasia) as nombreSucursal,
                ISNULL(SUM(s.cantidad), 0) as stockActual
            FROM producto p
            LEFT JOIN stock s ON p.idProducto = s.idProducto
            LEFT JOIN deposito d ON d.idDeposito = s.idDeposito
            LEFT JOIN v_sucursal su ON su.idSucursal = d.idSucursal
            WHERE p.idProducto=${idProducto}
            GROUP BY p.idProducto, p.codigo, p.nombreProducto, p.precio, su.idSucursal, su.nombreFantasia`,
        );

        if (result.recordset.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No se encontraron productos'
            });
            return;
        }

        // Estructuramos la respuesta agrupadamente si hay varias sucursales
        const productoMap = new Map();

        result.recordset.forEach((row) => {
            if (!productoMap.has(row.idProducto)) {
                productoMap.set(row.idProducto, {
                    idProducto: row.idProducto,
                    codigo: row.codigo,
                    nombreProducto: row.nombreProducto,
                    precio: row.precio,
                    stock: []
                });
            }
            if (row.nombreSucursal) {
                productoMap.get(row.idProducto).stock.push({
                    nombreSucursal: row.nombreSucursal,
                    stockActual: row.stockActual
                });
            }
        });

        const data = Array.from(productoMap.values());

        res.status(200).json({
            success: true,
            data,
            message: 'Producto obtenidos correctamente'
        });

    } catch (error) {
        console.error('Error en getProductoById:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el producto',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

export const getProductos = async (req: Request, res: Response): Promise<void> => {
    try {

        // Agrupamos el stock directamente en SQL o traemos todo en un solo JOIN
        const result = await executeQuery<any>(
            `SELECT 
                p.idProducto,
                p.codigo,
                p.nombreProducto,
                p.precio,
                rtrim(su.nombreFantasia) as nombreSucursal,
                ISNULL(SUM(s.cantidad), 0) as stockActual
            FROM producto p
            LEFT JOIN stock s ON p.idProducto = s.idProducto
            LEFT JOIN deposito d ON d.idDeposito = s.idDeposito
            LEFT JOIN v_sucursal su ON su.idSucursal = d.idSucursal
            GROUP BY p.idProducto, p.codigo, p.nombreProducto, p.precio, su.idSucursal, su.nombreFantasia`
        );

        if (result.recordset.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No se encontraron productos'
            });
            return;
        }

        // Estructuramos la respuesta agrupadamente si hay varias sucursales
        const productoMap = new Map();

        result.recordset.forEach((row) => {
            if (!productoMap.has(row.idProducto)) {
                productoMap.set(row.idProducto, {
                    idProducto: row.idProducto,
                    codigo: row.codigo,
                    nombreProducto: row.nombreProducto,
                    precio: row.precio,
                    stock: []
                });
            }
            if (row.nombreSucursal) {
                productoMap.get(row.idProducto).stock.push({
                    nombreSucursal: row.nombreSucursal,
                    stockActual: row.stockActual
                });
            }
        });

        const data = Array.from(productoMap.values());

        res.status(200).json({
            success: true,
            data,
            message: 'Productos obtenidos correctamente'
        });

    } catch (error) {
        console.error('Error en getProductos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los productos',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

