/**
 * Rutas de Productos
 */

import { Router } from 'express';
import * as productoController from '../controllers/producto.controller';

const router = Router();

// GET /api/productos/:id - Obtener producto por ID
router.get('/:id', productoController.getProductoById);

// GET /api/productos/ - Obtener todos los productos
router.get('/', productoController.getProductos);

export default router;
