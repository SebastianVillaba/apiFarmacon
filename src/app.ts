import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Importar rutas
import apiRoutes from './routes/index';

// Crear aplicación Express
const app: Application = express();

// ============================================================
// MIDDLEWARES GLOBALES
// ============================================================

// Seguridad HTTP headers
app.use(helmet());

// CORS
app.use(cors({
    origin: '*', // Configurar según necesidad
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logger de solicitudes HTTP
app.use(morgan('dev'));

// Parsear JSON
app.use(express.json());

// Parsear URL-encoded
app.use(express.urlencoded({ extended: true }));

// ============================================================
// RUTAS
// ============================================================

// Ruta de health check
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// Rutas de la API
app.use('/api', apiRoutes);

// ============================================================
// MANEJO DE ERRORES
// ============================================================

// Ruta no encontrada
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not Found',
        message: `La ruta ${req.method} ${req.originalUrl} no existe`
    });
});

// Manejador de errores global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);

    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
    });
});

export default app;
