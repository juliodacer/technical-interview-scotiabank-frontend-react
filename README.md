# 🏦 Sistema de Gestión de Productos Bancarios - Scotiabank

Aplicación web moderna para la gestión de productos financieros desarrollada con React, TypeScript y TanStack Query. Este proyecto implementa un sistema completo de visualización, búsqueda, filtrado y gestión de productos bancarios con una interfaz minimalista y accesible.

## 📋 Descripción del Proyecto

Sistema de gestión bancaria que permite administrar el catálogo de productos financieros (cuentas, tarjetas, préstamos, inversiones y seguros) con funcionalidades de búsqueda avanzada, paginación, y próximamente operaciones CRUD completas.

## ✨ Características Implementadas

### 🎯 Funcionalidades Principales

- **Listado de Productos con Paginación**: Visualización de productos bancarios con navegación por páginas (6 elementos por página)
- **Búsqueda en Tiempo Real**: Búsqueda con debounce (700ms) para optimizar consultas al servidor
- **Filtros Avanzados**: Filtrado por query, categoría y estado (activo/inactivo)
- **Detalle de Producto**: Vista completa de información del producto con formulario de edición
- **Estados de UI**: Loading skeletons, mensajes de error y estados vacíos
- **Responsive Design**: Diseño adaptable a dispositivos móviles, tablets y desktop
- **Accesibilidad WCAG**: Semántica HTML5, ARIA labels y navegación por teclado

### 🚀 Próximamente (CRUD Completo)

- ✅ **CREATE**: Crear nuevos productos bancarios
- ✅ **READ**: Visualización y búsqueda (implementado)
- ⏳ **UPDATE**: Editar productos existentes (formulario listo, pendiente integración API)
- ⏳ **DELETE**: Eliminar productos del catálogo

## 🛠️ Stack Tecnológico

### Core

- **React 19.2** - Biblioteca de UI
- **TypeScript 5.9** - Tipado estático
- **Vite 7.3** - Build tool y dev server

### Gestión de Estado y Datos

- **TanStack Query v5** - Server state management, caché y sincronización
- **React Router v7** - Enrutamiento declarativo
- **Axios 1.13** - Cliente HTTP

### Desarrollo

- **ESLint** - Linting de código
- **SWC** - Fast refresh y compilación rápida

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes globales reutilizables
│   └── CustomHeader.tsx
├── features/
│   └── products/        # Feature de productos
│       ├── components/  # Componentes específicos del feature
│       │   ├── pagination/
│       │   │   ├── Pagination.tsx
│       │   │   └── Pagination.css
│       │   ├── product-card/
│       │   │   ├── ProductCard.tsx
│       │   │   └── ProductCard.css
│       │   ├── product-list/
│       │   │   ├── ProductList.tsx
│       │   │   └── ProductList.css
│       │   └── SearchBar.tsx
│       ├── hooks/       # Custom hooks
│       │   ├── useProducts.ts
│       │   └── useProductById.ts
│       ├── interfaces/  # Tipos e interfaces TypeScript
│       │   └── product.response.ts
│       ├── layouts/     # Layouts de la aplicación
│       │   └── ProductsLayout.tsx
│       ├── pages/       # Páginas/vistas
│       │   ├── home/
│       │   │   ├── HomePage.tsx
│       │   │   └── HomePage.css
│       │   └── product-detail/
│       │       ├── ProductDetailPage.tsx
│       │       └── ProductDetailPage.css
│       └── services/    # Servicios y lógica de negocio
│           ├── actions/
│           │   ├── get-products-by-query.ts
│           │   └── get-product-by-id.ts
│           └── api/
│               └── productApi.tsx
├── router/              # Configuración de rutas
│   └── app.router.tsx
├── ProductsApp.tsx      # App principal con providers
└── main.tsx            # Entry point
```

## 🚦 Instalación y Ejecución

### Requisitos Previos

- Node.js 18+
- pnpm 8+ (o npm/yarn)

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd technical-interview-scotiabank-frontend-react

# Instalar dependencias
pnpm install
```

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
```

### Ejecutar en Desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
pnpm build
pnpm preview
```

## 🔌 API Endpoints

### Productos

**GET** `/products`

- Query params: `?page=1&size=6&q=busqueda&category=Cuentas&state=true`
- Respuesta: `{ products: Product[], total: number, page: number }`

**GET** `/products/:id`

- Respuesta: `Product`

**PUT** `/products/:id`

- Body: `Product`
- Respuesta: `Product`

**POST** `/products`

- Body: `Omit<Product, 'id'>`
- Respuesta: `Product`

**DELETE** `/products/:id`

- Respuesta: `{ success: boolean }`

## Arquitectura y Patrones

### Feature-Based Architecture

El proyecto sigue una arquitectura modular basada en features, donde cada característica (products, auth, etc.) es auto-contenida con sus propios componentes, hooks, servicios y tipos.

### TanStack Query para Server State

- **Caché inteligente**: 5 minutos staleTime, 10 minutos gcTime
- **Optimistic updates**: `placeholderData` para transiciones suaves
- **Query keys dinámicas**: Invalidación granular del caché
- **DevTools**: Debugging visual del estado del servidor

### Custom Hooks Pattern

Abstracción de lógica compleja en hooks reutilizables (`useProducts`, `useProductById`)

### Component Composition

Componentes pequeños, reutilizables y con responsabilidad única siguiendo principios SOLID

## Convenciones de Código

### Nomenclatura

- **Componentes**: PascalCase (`ProductCard.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useProducts.ts`)
- **Funciones/variables**: camelCase en inglés
- **Mensajes UI**: Español
- **Comentarios**: Inglés

### Estructura de Archivos

- Un componente por archivo
- Estilos CSS colocados junto al componente
- Interfaces compartidas en carpeta `interfaces/`
- Lógica de negocio en `services/`

### Clean Code

- Funciones pequeñas y con un solo propósito
- Nombres descriptivos y auto-explicativos
- Evitar abreviaciones confusas
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)

## Accesibilidad

- ✅ Semántica HTML5 (`<article>`, `<nav>`, `<main>`, `<form>`)
- ✅ ARIA labels y roles apropiados
- ✅ Navegación por teclado (Tab, Enter, Space)
- ✅ Focus visible para elementos interactivos
- ✅ Contraste de colores WCAG AA
- ✅ Textos alternativos y descripciones

## Scripts Disponibles

```bash
pnpm dev      # Servidor de desarrollo
pnpm build    # Build de producción
pnpm preview  # Preview del build
pnpm lint     # Linting de código
```

## Contribución

Este proyecto sigue clean code principles y convenciones estrictas. Por favor revisa las guías de estilo antes de contribuir.

## 📄 Licencia

Privado - Scotiabank Technical Interview

---

Desarrollado con ❤️ para Scotiabank
