/**
 * Rutas de Cotizaciones
 */

import { Router } from 'express';
import * as cotizacionController from '../controllers/cotizacion.controller';

const router = Router();

// GET /api/cotizacion/ - Obtener cotizaciones de compra por moneda
router.get('/', cotizacionController.getCotizaciones);

export default router;
