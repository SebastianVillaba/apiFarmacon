import { Router } from 'express';

// Importar rutas específicas
import productoRoutes from './producto.routes';

const router = Router();

// ============================================================
// REGISTRAR RUTAS
// ============================================================

// Rutas de productos
router.use('/productos', productoRoutes);

// Ruta de prueba
router.get('/', (req, res) => {
    res.json({
        message: 'API funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            health: 'GET /health',
            api: 'GET /api'
        }
    });
});

export default router;
