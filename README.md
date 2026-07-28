# API TypeScript con Express - Guía de Setup

## 📋 Índice

1. [Requisitos Previos](#requisitos-previos)
2. [Crear Proyecto desde Cero](#crear-proyecto-desde-cero)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Configuración de TypeScript](#configuración-de-typescript)
5. [Scripts Disponibles](#scripts-disponibles)
6. [Cómo Crear Nuevos Módulos](#cómo-crear-nuevos-módulos)
7. [Dependencias Instaladas](#dependencias-instaladas)

---

## 🔧 Requisitos Previos

- **Node.js** v18 o superior
- **npm** v9 o superior
- Editor de código (VS Code recomendado)

---

## 🚀 Crear Proyecto desde Cero

Si quisieras recrear este proyecto desde cero, estos son los pasos:

### Paso 1: Inicializar el proyecto

```bash
mkdir mi-api-typescript
cd mi-api-typescript
npm init -y
```

### Paso 2: Instalar dependencias de producción

```bash
npm install express cors dotenv helmet morgan
```

| Paquete | Descripción |
|---------|-------------|
| `express` | Framework web para Node.js |
| `cors` | Middleware para habilitar CORS |
| `dotenv` | Cargar variables de entorno desde `.env` |
| `helmet` | Seguridad mediante headers HTTP |
| `morgan` | Logger de peticiones HTTP |

### Paso 3: Instalar dependencias de desarrollo

```bash
npm install -D typescript @types/node @types/express @types/cors @types/morgan ts-node nodemon
```

| Paquete | Descripción |
|---------|-------------|
| `typescript` | Compilador de TypeScript |
| `@types/*` | Definiciones de tipos para TypeScript |
| `ts-node` | Ejecutar TypeScript directamente |
| `nodemon` | Auto-reinicio en desarrollo |

### Paso 4: Inicializar TypeScript

```bash
npx tsc --init
```

### Paso 5: Configurar tsconfig.json

Editar el archivo `tsconfig.json` con la siguiente configuración:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "commonjs",
    "target": "ES2020",
    "lib": ["ES2020"],
    "types": ["node"],
    "sourceMap": true,
    "declaration": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Paso 6: Configurar scripts en package.json

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts",
    "lint": "tsc --noEmit"
  }
}
```

### Paso 7: Crear nodemon.json

```json
{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node src/index.ts"
}
```

### Paso 8: Crear estructura de carpetas

```
src/
├── config/         # Configuraciones
├── controllers/    # Lógica de peticiones
├── interfaces/     # Tipos e interfaces TypeScript
├── middlewares/    # Middlewares personalizados
├── routes/         # Definición de rutas
├── utils/          # Funciones utilitarias
├── app.ts          # Configuración de Express
└── index.ts        # Punto de entrada
```

---

## 📁 Estructura del Proyecto

```
apiGlobalFarma/
├── dist/                        # Código compilado (generado)
├── node_modules/                # Dependencias
├── src/
│   ├── config/
│   │   └── index.ts             # Configuración centralizada
│   ├── controllers/
│   │   └── example.controller.ts # Controller de ejemplo
│   ├── interfaces/
│   │   └── index.ts             # Interfaces y types
│   ├── middlewares/
│   │   └── index.ts             # Middlewares personalizados
│   ├── routes/
│   │   ├── index.ts             # Router principal
│   │   └── example.routes.ts    # Rutas de ejemplo
│   ├── utils/
│   │   └── index.ts             # Funciones utilitarias
│   ├── app.ts                   # Configuración de Express
│   └── index.ts                 # Punto de entrada
├── .env                         # Variables de entorno (local)
├── .env.example                 # Template de variables
├── .gitignore                   # Archivos a ignorar en Git
├── nodemon.json                 # Config de nodemon
├── package.json                 # Dependencias y scripts
└── tsconfig.json                # Configuración de TypeScript
```

---

## ⚙️ Configuración de TypeScript

### Opciones importantes del `tsconfig.json`:

| Opción | Valor | Descripción |
|--------|-------|-------------|
| `rootDir` | `./src` | Carpeta con código fuente |
| `outDir` | `./dist` | Carpeta de salida compilada |
| `module` | `commonjs` | Sistema de módulos de Node.js |
| `target` | `ES2020` | Versión de JavaScript de salida |
| `strict` | `true` | Habilita todas las verificaciones estrictas |
| `esModuleInterop` | `true` | Compatibilidad con imports ES6 |

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia en modo desarrollo con hot-reload |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Ejecuta la versión compilada |
| `npm run lint` | Verifica errores de TypeScript sin compilar |

---

## 🛠️ Cómo Crear Nuevos Módulos

### 1. Crear el Controller

Archivo: `src/controllers/user.controller.ts`

```typescript
import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Tu lógica aquí
    res.status(200).json({
      success: true,
      data: [],
      message: 'Usuarios obtenidos'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios'
    });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    // Tu lógica aquí
    res.status(201).json({
      success: true,
      data: data,
      message: 'Usuario creado'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear usuario'
    });
  }
};
```

### 2. Crear las Rutas

Archivo: `src/routes/user.routes.ts`

```typescript
import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validateBodyNotEmpty } from '../middlewares';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', validateBodyNotEmpty, userController.createUser);

export default router;
```

### 3. Registrar las Rutas

Archivo: `src/routes/index.ts`

```typescript
import { Router } from 'express';
import userRoutes from './user.routes';

const router = Router();

// Registrar las rutas de usuarios
router.use('/users', userRoutes);

export default router;
```

### 4. Crear Interfaces (opcional pero recomendado)

Archivo: `src/interfaces/user.interface.ts`

```typescript
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}
```

---

## 📦 Dependencias Instaladas

### Producción

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| express | ^5.2.1 | Framework web |
| cors | ^2.8.5 | Manejo de CORS |
| dotenv | ^17.2.3 | Variables de entorno |
| helmet | ^8.1.0 | Seguridad HTTP |
| morgan | ^1.10.1 | Logger HTTP |

### Desarrollo

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| typescript | ^5.9.3 | Compilador TS |
| @types/node | ^25.0.1 | Tipos de Node.js |
| @types/express | ^5.0.6 | Tipos de Express |
| @types/cors | ^2.8.19 | Tipos de CORS |
| @types/morgan | ^1.9.10 | Tipos de Morgan |
| ts-node | ^10.9.2 | Ejecutar TS |
| nodemon | ^3.1.11 | Hot-reload |

---

## 🏃 Iniciar el Proyecto

```bash
# Modo desarrollo (con hot-reload)
npm run dev

# Compilar para producción
npm run build

# Ejecutar versión compilada
npm start
```

La API estará disponible en: `http://localhost:3000`

### Endpoints disponibles:

- `GET /health` - Health check
- `GET /api` - Información de la API

---

## ✅ Próximos Pasos

1. **Agregar base de datos**: Instalar `mssql` o el driver de tu preferencia
2. **Agregar autenticación**: Implementar JWT con `jsonwebtoken`
3. **Agregar validación**: Usar `zod` o `joi` para validar datos
4. **Agregar testing**: Configurar `jest` para pruebas unitarias

---

¡Proyecto listo para desarrollar! 🚀
