# Sistema de Gestión de Productos Bancarios - Scotiabank

Aplicación web moderna para la gestión de productos financieros desarrollada con React, TypeScript y TanStack Query. Implementa un CRUD completo con búsqueda avanzada, filtros, paginación e interfaz minimalista y accesible.

## Descripción del Proyecto

Sistema de gestión bancaria que permite administrar el catálogo de productos financieros (tarjetas, créditos, cuentas) con operaciones completas de creación, lectura, actualización y eliminación, búsqueda en tiempo real, filtrado multicritrio y paginación servidor.

## Tiempo invertido en la realización del proyecto
4.5 hrs aproximadamente

## Características Implementadas

### CRUD Completo

- **CREATE**: Creación de productos mediante modal con formulario validado
- **READ**: Listado paginado con tabla responsive, vista detalle individual
- **UPDATE**: Edición de productos desde la página de detalle
- **DELETE**: Eliminación con diálogo de confirmación y manejo de errores

### Funcionalidades de UI

- **Tabla de Productos con Paginación**: Navegación por páginas con 6 elementos por página, indicador de rango y controles siempre visibles
- **Búsqueda en Tiempo Real**: Debounce de 700ms para optimizar consultas al servidor, botón de limpiar texto
- **Filtros Avanzados**: Filtrado simultáneo por nombre, categoría (dropdown dinámico desde API) y estado (activo/inactivo)
- **Detalle de Producto**: Vista completa con todos los campos, formateo de fechas con date-fns, categorías dinámicas
- **Notificaciones Toast**: Feedback visual de éxito y error con auto-cierre configurable
- **Diálogos de Confirmación**: Modal personalizado para acciones destructivas con variantes de estilo
- **Estados de UI Reutilizables**: Componentes de carga (spinner), error (con reintento) y vacío (con acción opcional)

### UI/UX

- **Diseño Minimalista**: Paleta profesional basada en slate/gray con acentos verdes (éxito), rojos (error) y ámbar (advertencia)
- **Animaciones Sutiles**: fadeIn, scaleIn, floatIn, spinner y pulse para transiciones suaves
- **Responsive Design**: Tabla en desktop/tablet, adaptación en móvil
- **Accesibilidad WCAG**: Semántica HTML5, ARIA labels, navegación por teclado, roles, aria-live y focus visible

### Optimización de Rendimiento

- **React.memo**: Componentes hoja memoizados (FilterSelect, SearchBar, Pagination) para evitar re-renders innecesarios
- **useMemo**: Cálculos derivados memoizados (categoryOptions, pageNumbers, stateValue)
- **useCallback**: Referencias de funciones estabilizadas para callbacks pasados como props
- **TanStack Query**: Caché inteligente, staleTime, placeholderData para transiciones suaves

## Stack Tecnológico

### Core

- **React 19.2** - Biblioteca de UI
- **TypeScript 5.9** - Tipado estático
- **Vite 7.3** - Build tool y dev server

### Gestión de Estado y Datos

- **TanStack Query v5** - Server state management, caché, mutations y sincronización
- **React Router v7** - Enrutamiento declarativo
- **Axios 1.13** - Cliente HTTP

### Utilidades

- **date-fns 4.1** - Formateo y manipulación de fechas con soporte de locale español

### Testing

- **Vitest 4.0** - Framework de testing
- **Testing Library React 16.3** - Testing de componentes
- **Testing Library User Event 14.6** - Simulación de interacciones de usuario
- **Testing Library Jest DOM 6.9** - Matchers adicionales para DOM
- **jsdom 28** - Entorno DOM para tests

### Desarrollo

- **ESLint 9** - Linting de código
- **SWC** - Fast refresh y compilación rápida

## Estructura del Proyecto

```
src/
├── components/                  # Componentes globales reutilizables
│   ├── CustomHeader.tsx
│   └── CustomHeader.test.tsx
├── features/
│   └── products/                # Feature de productos
│       ├── components/
│       │   ├── confirm-dialog/  # Diálogo de confirmación reutilizable
│       │   ├── filter-bar/      # Barra de filtros (búsqueda + dropdowns)
│       │   ├── filter-select/   # Dropdown reutilizable para filtros
│       │   ├── pagination/      # Controles de paginación
│       │   ├── product-card/    # Card de producto (vista legacy)
│       │   ├── product-form/    # Formulario de producto (crear/editar)
│       │   ├── product-list/    # Lista de productos (vista legacy)
│       │   ├── product-modal/   # Modal para crear productos
│       │   ├── product-table/   # Tabla principal con acciones
│       │   ├── toast/           # Notificaciones toast
│       │   ├── ui-states/       # LoadingState, ErrorState, EmptyState
│       │   └── SearchBar.tsx    # Búsqueda con debounce
│       ├── hooks/               # Custom hooks con TanStack Query
│       │   ├── useProducts.ts         # Query: listado paginado
│       │   ├── useProductById.ts      # Query: detalle por ID
│       │   ├── useCategories.ts       # Query: listado de categorías
│       │   ├── useCreateProduct.ts    # Mutation: crear producto
│       │   ├── useUpdateProduct.ts    # Mutation: actualizar producto
│       │   └── useDeleteProduct.ts    # Mutation: eliminar producto
│       ├── interfaces/          # Tipos e interfaces TypeScript
│       │   ├── product.response.ts
│       │   ├── product-mutations.ts
│       │   └── category.response.ts
│       ├── layouts/
│       │   └── ProductsLayout.tsx
│       ├── pages/
│       │   ├── home/            # Página principal con tabla y filtros
│       │   └── product-detail/  # Página de detalle/edición
│       ├── services/
│       │   ├── actions/         # Funciones de API
│       │   │   ├── get-products-by-query.ts
│       │   │   ├── get-product-by-id.ts
│       │   │   ├── get-categories.ts
│       │   │   ├── create-product.ts
│       │   │   ├── update-product.ts
│       │   │   └── delete-product.ts
│       │   └── api/
│       │       └── productApi.tsx
│       └── utils/
│           └── validateProduct.ts  # Validaciones de formulario
├── test/                        # Configuración y helpers de testing
│   ├── setup.ts
│   ├── helpers.tsx
│   └── mocks/
│       └── products.ts
├── router/
│   └── app.router.tsx
├── index.css
├── ProductsApp.tsx
└── main.tsx
```

## Instalación y Ejecución

### Requisitos Previos

- Node.js 18+
- pnpm 10+ (recomendado)

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
VITE_API_URL=http://localhost:3003/api
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

## Testing

El proyecto incluye una suite de tests con **133 tests** distribuidos en **21 archivos de test**.

### Ejecutar Tests

```bash
pnpm test          # Modo watch (re-ejecuta al guardar cambios)
pnpm test:run      # Ejecuta todos los tests una vez
pnpm test:coverage # Ejecuta con reporte de cobertura
```

### Cobertura de Tests

| Capa | Archivos | Tests | Descripción |
|---|---|---|---|
| Utilidades | 1 | 19 | Validaciones de formulario |
| Service Actions | 6 | 18 | Llamadas API con mocks de axios |
| Custom Hooks | 5 | 14 | Hooks con QueryClientProvider |
| Componentes simples | 6 | 45 | CustomHeader, LoadingState, EmptyState, ErrorState, Toast, FilterSelect |
| Componentes con estado | 3 | 37 | Pagination, SearchBar, ConfirmDialog |

### Estrategia de Testing

- **Utilidades puras**: Tests directos de funciones sin dependencias externas
- **Service Actions**: Mock de `productApi` (axios) para verificar endpoints, parámetros y respuestas
- **Custom Hooks**: Wrapper con `QueryClientProvider` y mock de las actions
- **Componentes**: Testing Library con interacciones de usuario reales (`userEvent`), verificación de accesibilidad y comportamiento

## API Endpoints

### Productos

| Método | Endpoint | Descripción |
|---|---|---|
| **GET** | `/products?page=1&size=6&q=oro&category=Tarjeta&state=true` | Listado paginado con filtros |
| **GET** | `/products/:id` | Detalle de un producto |
| **POST** | `/products` | Crear producto |
| **PATCH** | `/products/:id` | Actualizar producto (parcial) |
| **DELETE** | `/products/:id` | Eliminar producto |

### Categorías

| Método | Endpoint | Descripción |
|---|---|---|
| **GET** | `/categories` | Listado de categorías |

### Ejemplo de Request (POST /products)

```json
{
  "code": "TCO0007",
  "name": "Tarjeta de Crédito Oro",
  "description": "Programa de recompensas y seguros incluidos.",
  "price": 0.0,
  "categoryId": 1
}
```

## Arquitectura y Patrones

### Feature-Based Architecture

Arquitectura modular donde cada feature es auto-contenida con sus propios componentes, hooks, servicios y tipos.

### TanStack Query para Server State

- **Queries**: `useProducts`, `useProductById`, `useCategories` con caché, staleTime y placeholderData
- **Mutations**: `useCreateProduct`, `useUpdateProduct`, `useDeleteProduct` con invalidación granular del caché
- **DevTools**: Debugging visual del estado del servidor

### Custom Hooks Pattern

Abstracción de lógica en hooks reutilizables que encapsulan queries y mutations de TanStack Query.

### Component Composition

Componentes pequeños, reutilizables y con responsabilidad única. Componentes de UI state (`LoadingState`, `ErrorState`, `EmptyState`) y de formulario (`ProductForm`, `FilterSelect`) extraídos para reutilización.

### Validaciones

Funciones de validación puras (`validateProductForm`, `hasFormErrors`) separadas de los componentes, fácilmente testeables.

## Convenciones de Código

### Nomenclatura

- **Componentes**: PascalCase (`ProductForm.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useProducts.ts`)
- **Tests**: Mismo nombre con sufijo `.test` (`useProducts.test.tsx`)
- **Funciones/variables**: camelCase en inglés
- **Mensajes UI**: Español
- **Comentarios y código**: Inglés

### Clean Code

- Funciones pequeñas y con un solo propósito
- Nombres descriptivos y auto-explicativos
- SOLID, DRY, KISS
- Componentes memoizados donde aporta valor real

## Accesibilidad

- Semántica HTML5 (`<header>`, `<nav>`, `<main>`, `<form>`, `<table>`)
- ARIA: `role`, `aria-label`, `aria-live`, `aria-busy`, `aria-modal`, `aria-current`, `aria-invalid`, `aria-required`
- Navegación por teclado (Tab, Enter, Escape)
- Focus visible para elementos interactivos
- Contraste de colores WCAG AA
- Scroll lock en modales/diálogos

## Scripts Disponibles

```bash
pnpm dev           # Servidor de desarrollo
pnpm build         # Build de producción
pnpm preview       # Preview del build
pnpm lint          # Linting de código
pnpm test          # Tests en modo watch
pnpm test:run      # Tests una sola vez
pnpm test:coverage # Tests con cobertura
```

---

Desarrollado para Scotiabank Technical Interview
