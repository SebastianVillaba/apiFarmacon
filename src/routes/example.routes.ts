/**
 * Rutas de ejemplo
 * 
 * Ejemplo de cómo estructurar las rutas de un módulo.
 */

import { Router } from 'express';
import * as exampleController from '../controllers/example.controller';
import { validateIdParam, validateBodyNotEmpty } from '../middlewares';

const router = Router();

// GET /api/example - Obtener todos
router.get('/', exampleController.getAll);

// GET /api/example/:id - Obtener por ID
router.get('/:id', validateIdParam, exampleController.getById);

// POST /api/example - Crear nuevo
router.post('/', validateBodyNotEmpty, exampleController.create);

// PUT /api/example/:id - Actualizar
router.put('/:id', validateIdParam, validateBodyNotEmpty, exampleController.update);

// DELETE /api/example/:id - Eliminar
router.delete('/:id', validateIdParam, exampleController.remove);

export default router;
