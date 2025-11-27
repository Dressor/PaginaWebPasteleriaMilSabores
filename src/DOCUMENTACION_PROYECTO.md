# Documentación pedagógica del proyecto — Pastelería 1000 Sabores

Fecha: 2025-10-28

Esta guía explica de forma pedagógica la estructura del proyecto, cómo se conectan sus archivos, qué hace cada prueba, cómo se utiliza Bootstrap para el diseño responsivo, el enrutamiento con React Router y otros detalles útiles para entender y trabajar con el código.

## Índice

- Introducción
- Arquitectura general y flujo de la aplicación
- Archivos principales y su rol (explicación por capas)
  - Entrada y bootstrap (index.js)
  - Ruteo y carga (App.jsx)
  - Contextos (Auth, Cart, Theme)
  - Componentes reutilizables
  - Páginas
  - Datos y assets
  - Tests
- Cómo funciona Bootstrap en el proyecto (ejemplos concretos)
- Router: cómo están definidas las rutas y cómo navegar programáticamente
- Tests: qué test hay y qué comprueban (explicación por fichero)
- Buenas prácticas y consejos para extender el proyecto
- Cómo ejecutar la app y los tests

---

## Introducción

Este proyecto es una SPA (Single Page Application) de ejemplo para una pastelería virtual. Está implementado con React y usa `react-bootstrap` + Bootstrap CSS para estilos y layout. La lógica de negocio principal (carrito, descuentos, validaciones) está centralizada en un contexto (`CartContext`). El proyecto incluye una suite de pruebas basada en Jasmine + Karma y también soporta Jest + React Testing Library para desarrollo.

El objetivo de este documento es explicar de forma sencilla cómo comprender y trabajar con el código, ideal para estudiantes que necesitan leer/editar/elaborar tests o añadir funcionalidades.

---

## Arquitectura general y flujo de la aplicación

1. `index.js` monta la aplicación en el DOM y envuelve `App` con proveedores globales:
   - `BrowserRouter` (React Router) — maneja el historial y la navegación.
   - `CartProvider` — proporciona el estado global del carrito a toda la app.
   - (Opcional) `AuthProvider` en `App.jsx` envuelve internamente páginas para manejar autenticación.

2. `App.jsx` declara rutas usando `<Routes>` y `<Route>` de React Router. Muchas páginas se cargan de forma perezosa con `React.lazy()` y se muestran bajo un `Layout` común.

3. Las páginas consumen los contextos (`useCart`, `useAuth`) para mostrar datos y ejecutar acciones (p. ej. `addToCart`). Los componentes visuales (Header, Footer, Cards) se reutilizan en distintas páginas.

4. `CartContext` contiene la lógica de negocio: manejo de items, límites de stock, cálculo de precios y descuentos, validaciones de orden, y toasts para feedback. Esto permite que las páginas permanezcan enfocadas en la UI y deleguen la lógica al contexto.

---

## Archivos principales y su rol (explicado por capas)

### Entrada y bootstrap — `src/index.js`

- ¿Qué hace? Importa estilos globales (Bootstrap, íconos, index.css), crea el root React y renderiza:
  - `<BrowserRouter>` para enrutar.
  - `<CartProvider>` para context del carrito.
  - `<App />` contiene las rutas y la estructura principal.
- Por qué es importante: centraliza los providers que deben estar disponibles en toda la app.

### Ruteo y carga — `src/App.jsx`

- Define las rutas principales: `/`, `/productos`, `/producto/:code`, `/carrito`, `/checkout`, `/login`, `/registro`, `/mis-pedidos`, `/blogs`, etc.
- Usa `React.Suspense` y `lazy()` para cargar páginas bajo demanda: mejora la performance inicial.
- Incluye `AuthProvider` para exponer `useAuth` a las páginas (gestión de sesión, registro, login).

Concepto pedagógico: las rutas mapean URLs a componentes React; la carga perezosa separa el bundle y reduce el costo inicial.

### Contextos — `src/context/*.jsx`

- `CartContext.jsx` (o `.js`): la pieza clave. Expone:
  - `items`, `addToCart`, `removeFromCart`, `setQty`, `clearCart`.
  - `getPricing` que calcula `subtotal`, `descuentos` y `total` según reglas (descuento por monto, reserva anticipada, cupones).
  - `validarOrden` que devuelve errores si falta fecha de entrega, si es domingo, si carrito vacío, etc.
  - `fmtCLP` para formatear moneda (CLP).
  - `toasts` y utilidades para notificaciones.

- `AuthContext.jsx`: maneja registro, login, logout y persistencia con `localStorage`/`sessionStorage`. Importante: es una implementación de ejemplo para demo; en producción se debe usar un backend con contraseñas hasheadas y tokens.

- `ThemeContext.jsx` (si existe): maneja modo claro/oscuro o esquema visual.

Pedagogía: los contextos sirven para evitar "prop drilling" (pasar props muchas capas) y para centralizar lógica compartida.

### Componentes reutilizables — `src/components/`

- `Header.jsx`: barra de navegación, buscador, sugerencias, saludo de usuario y botón de logout. Usa `useAuth` y `useCart`. Implementa accesibilidad básica (role, aria-labels).
- `Footer.jsx`: información de contacto y redes.
- `CartBadge.jsx`: muestra cantidad de items en el carrito.
- `Spinner.jsx` y `CheckoutLoading.jsx`: UI para carga y procesamiento.
- `SectionHeader.jsx`, `Layout.jsx`, `ThemeToggle.jsx` — ayudan a mantener consistencia visual.

Cómo usarlos: las páginas importan los componentes según necesidad. Por ejemplo, `Layout.jsx` renderiza `Header` + `Footer` y envuelve el `<Outlet />` de las rutas.

### Páginas — `src/pages/`

- `Home.jsx`: página principal, muestra destacados.
- `Productos.jsx`: catálogo con filtros por categoría, búsqueda, tarjetas con botones "Ver" y "Agregar". Integra `addToCart` y `qtyInCart`.
- `Producto.jsx`: detalle de producto (imagen, descripción, añadir cantidad).
- `Carrito.jsx`: lista de items, control de cantidades, aplicación de cupones (requiere login para aplicar cupón), resumen de precios y botón "Confirmar compra" que lleva a `/checkout`.
- `Checkout.jsx`: formulario de envío y datos de pago; incluye validaciones (Luhn para número de tarjeta, vencimiento, CVC) y simulación de proceso.
- `MisPedidos.jsx`, `CheckoutExito.jsx`, `Login.jsx`, `Registro.jsx`: flujos asociados a autenticación e historial.

### Datos y assets — `src/data/productos.js`, `src/assets/` y `src/styles/`

- `productos.js` contiene el catálogo con campos: `codigo`, `nombre`, `precio`, `stock`, `categoria`, `imagen`, `descripcion`.
- `assets/img` contiene logo e imágenes usadas por tarjetas.
- `styles/estilos.css` y `index.css` contienen estilos adicionales (brand colors, utilidades).

---

## Cómo funciona Bootstrap en el proyecto (ejemplos)

1. Import global: `src/index.js` importa `bootstrap/dist/css/bootstrap.min.css` — por tanto todas las clases utilitarias y grid de Bootstrap están disponibles.
2. Uso de `react-bootstrap`: componentes como `Container`, `Row`, `Col`, `Card`, `Form`, `InputGroup`, `Button` se usan para construir layouts accesibles y responsive.

Ejemplos pedagógicos:

- Grid en `Productos.jsx`:
  - `<Row className="g-4">` agrupa tarjetas de productos.
  - `<Col md={4}>` hace que en pantallas medianas (>=768px) se muestren 3 columnas; en móviles cada tarjeta ocupa ancho completo.

- Formulario + columna lateral en `Carrito.jsx` y `Checkout.jsx`:
  - `<div className="col-12 col-lg-8">` y `<div className="col-12 col-lg-4">` — en pantallas grandes se muestran como 8/4 columnas; en móviles ocupan todo el ancho.

- Barra de navegación (`Header.jsx`): usa `navbar-expand-lg` y `navbar-toggler` para colapsar el menú en pantallas pequeñas.

Consejo práctico: para debugging responsive, usar herramientas de devtools (Chrome) y probar puntos de ruptura (`xs`, `sm`, `md`, `lg`, `xl`).

---

## Router: rutas y navegación programática

- El enrutado está en `App.jsx` con `<Routes>` y `<Route>`. Ejemplo clave:
  - `<Route path="/productos" element={<Productos />} />`
  - `<Route path="/producto/:code" element={<Producto />} />`
  - Rutas anidadas dentro de `Layout` para el header/footer comunes.

- Navegación programática: `useNavigate()` se utiliza para redirigir desde handlers. Ejemplo: en `Productos.jsx` `onCardClick` usa `navigate(`/producto/${producto.codigo}`)`.

- Query params: `Header` usa `navigate(`/productos?q=${encodeURIComponent(q)}`)` para búsquedas y `Productos.jsx` lee `useSearchParams()` para inicializar el campo de búsqueda según `?q=`.

Pedagogía: `BrowserRouter` usa la History API; los componentes no recargan la página al navegar.

---

## Tests: qué existe y qué comprueban

Los tests están en `src/tests/*.spec.js` y en `src/components/*.spec.js`. Karma está configurado para ejecutar `src/**/*.spec.js`.

Lista de tests e explicación pedagógica de cada uno:

1. `src/test.spec.js` — Demo simple
   - Qué comprueba: que `2 + 2 === 4`.
   - Por qué: ejemplo mínimo para validar que el entorno de pruebas está funcionando.

2. `src/tests/products.spec.js` — integridad de datos del catálogo
   - Qué comprueba:
     - Que `productos` exporta un array no vacío.
     - Que cada producto tiene `codigo`, `nombre`, `precio` (number >= 0) y `stock` (number >= 0).
   - Por qué es útil: asegura que la fuente de datos tiene la estructura esperada y evita errores en componentes que consumen esos campos.

3. `src/tests/cart.spec.js` — funcionalidad del `CartContext`
   - Qué comprueba:
     - `addToCart` respeta el `stock` y acumula cantidad correctamente.
     - `removeFromCart` disminuye cantidad y elimina el item cuando llega a 0.
     - `getPricing` aplica descuentos (ej. descuento por monto >= 30000 -> 10%).
     - `validarOrden` retorna errores cuando faltan `fechaEntrega` o `items`.
   - Cómo está probado: el test monta un `CartProvider` y un `TestApp` que expone la API del contexto; luego usa `act()` y `waitFor()` para realizar operaciones asíncronas y asserts.
   - Enseñanza: demuestra cómo probar lógica encapsulada en un contexto sin depender del DOM.

4. `src/tests/components.spec.js` — componente de loading
   - Qué comprueba:
     - `CheckoutLoading` se renderiza cuando `visible=true` y muestra el mensaje.
     - No se renderiza el overlay cuando `visible=false`.
   - Por qué: los componentes de estado/overlay pueden bloquear UX si fallan; este test valida la visibilidad y el DOM.

5. `src/tests/auth.spec.js` — `AuthContext` (registro, login, logout)
   - Qué comprueba:
     - `register` añade un usuario a `localStorage`.
     - `register` no duplica correos existentes.
     - `login` guarda `current_user` en `sessionStorage` y devuelve el usuario (sin password en la sesión).
     - `logout` limpia `current_user`.
   - Cómo: monta `AuthProvider` y usa un `AuthTester` helper para llamar a la API del contexto. Usa `localStorage` y `sessionStorage` para comprobar persistencia.
   - Enseñanza: muestra pruebas de persistencia sencilla sin backend.

6. `src/components/Header.spec.js` — Header (usando RTL)
   - Qué comprueba:
     - Elementos principales (nombre de la marca, imagen con alt, links de navegación, caja de búsqueda, botón de buscar).
     - Las rutas y atributos básicos están presentes.
   - Por qué: tests de UI básicos que ayudan a detectar regresiones en el header.


### Recomendación para sumar tests hasta 10 (implementación práctica)
- Añadir tests que actúen sobre el DOM y simulen interacciones (ej.: click en "Agregar", llenado de formulario de Checkout, aplicar cupón). Cada uno de esos se suele descomponer en 2–3 `it()` por caso.

---

## Buenas prácticas y consejos para extender el proyecto

- Mantén la lógica de negocio fuera de componentes presentacionales (ya se hace con `CartContext`). Esto facilita testing unitario.
- Escribe tests que simulen flujos completos (user story): navegar → agregar → comprobar total → checkout.
- Usa `msw` (Mock Service Worker) para simular llamadas HTTP si más adelante integras APIs.
- Extra: considera PropTypes o TypeScript para validar props en tiempo de desarrollo.

---

## Cómo ejecutar la app y los tests

Desde la raíz del proyecto (PowerShell):

```powershell
npm install
npm start        # arranca la app en http://localhost:3000
npm test         # Jest + React Testing Library (modo interactivo)
npm run test:karma  # Karma + Jasmine en ChromeHeadless (single-run)
```

Notas:
- `npm run test:karma` ejecutará los specs que terminan en `.spec.js` dentro de `src/`. Los reportes de cobertura se colocan en `coverage/`.
- Si ChromeHeadless no está disponible en tu entorno, instala Chrome o ajusta `karma.conf.js` para usar otro launcher.

---

## Cierre pedagógico

Este proyecto es un buen ejemplo para aprender patrones modernos de React: Context para estado global, separación de responsabilidades, uso de `react-bootstrap` para diseño responsivo y una pipeline de testing dual (Jest/RTL para desarrollo y Karma/Jasmine para pruebas en navegador). Para completar la entrega docente debes añadir al menos 5 tests adicionales para llegar a 10 y, opcionalmente, mejorar la documentación técnica (agregar sección de decisiones de diseño en `README.md`).

Si quieres, implemento ahora 5 tests sugeridos y los añado a `src/tests/` listos para ejecutar por Karma, o bien te agrego la sección de "Decisiones de diseño" al `README.md`. ¿Cuál prefieres que haga ahora? 
