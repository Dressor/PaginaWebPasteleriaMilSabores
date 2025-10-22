# Guía de Buenas Prácticas - Pastelería Mil Sabores

Este documento describe las buenas prácticas de desarrollo implementadas en el proyecto.

## 📋 Tabla de Contenidos

1. [Estructura del Código](#estructura-del-código)
2. [Estilo de Código](#estilo-de-código)
3. [Comentarios y Documentación](#comentarios-y-documentación)
4. [Componentes React](#componentes-react)
5. [Estado y Context](#estado-y-context)
6. [Validaciones](#validaciones)
7. [Accesibilidad](#accesibilidad)
8. [Rendimiento](#rendimiento)
9. [SEO](#seo)
10. [Testing](#testing)

---

## 📁 Estructura del Código

### Organización de Carpetas

```
src/
├── components/       # Componentes reutilizables
├── pages/           # Páginas/vistas de la aplicación
├── context/         # Contextos de React (estado global)
├── hooks/           # Custom hooks
├── utils/           # Funciones utilitarias
├── constants/       # Constantes y configuraciones
├── data/            # Datos estáticos/mock
├── assets/          # Recursos estáticos (imágenes, etc.)
└── styles/          # Estilos CSS globales
```

### Principios de Organización

✅ **Un componente por archivo**
✅ **Nombres descriptivos en PascalCase para componentes**
✅ **Nombres en camelCase para funciones y variables**
✅ **Archivos relacionados agrupados en carpetas**

---

## 💅 Estilo de Código

### Nomenclatura

**Componentes:**
```javascript
// ✅ Correcto
export default function ProductCard() { }

// ❌ Incorrecto
export default function productcard() { }
```

**Variables y Funciones:**
```javascript
// ✅ Correcto
const getUserData = () => { }
const isAuthenticated = true;

// ❌ Incorrecto
const GetUserData = () => { }
const is_authenticated = true;
```

**Constantes:**
```javascript
// ✅ Correcto
const MAX_ITEMS = 50;
const API_BASE_URL = 'https://api.example.com';

// ❌ Incorrecto
const maxItems = 50;
const apiBaseUrl = 'https://api.example.com';
```

### Formato

- **Indentación**: 2 espacios
- **Punto y coma**: Siempre al final de sentencias
- **Comillas**: Simples para strings, dobles para JSX
- **Líneas en blanco**: Una línea entre funciones y bloques lógicos

---

## 📝 Comentarios y Documentación

### JSDoc para Funciones

```javascript
/**
 * Valida un correo electrónico.
 * 
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido, false si no
 * @throws {Error} Si el email es null o undefined
 */
export const validateEmail = (email) => {
  // Implementación
};
```

### Comentarios en Componentes

```javascript
/**
 * Componente de tarjeta de producto.
 * Muestra información del producto y permite agregarlo al carrito.
 * 
 * @component
 * @param {Object} props - Props del componente
 * @param {Object} props.product - Datos del producto
 * @param {Function} props.onAddToCart - Callback al agregar al carrito
 * @returns {JSX.Element} Tarjeta de producto
 */
export default function ProductCard({ product, onAddToCart }) {
  // Implementación
}
```

### Comentarios Inline

```javascript
// ✅ Correcto: Explica el "por qué"
// Validamos antes de enviar para evitar llamadas innecesarias a la API
if (!isValid) return;

// ❌ Incorrecto: Explica el "qué" (obvio al leer el código)
// Incrementa el contador
setCount(count + 1);
```

---

## ⚛️ Componentes React

### Estructura de Componentes

```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// 2. Constantes locales (si las hay)
const DEFAULT_LIMIT = 10;

// 3. Componente
export default function MyComponent({ title, items }) {
  // 3.1. Hooks
  const [data, setData] = useState([]);
  
  // 3.2. Efectos
  useEffect(() => {
    // Cargar datos
  }, []);
  
  // 3.3. Funciones helper
  const handleClick = () => {
    // Lógica
  };
  
  // 3.4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// 4. PropTypes (opcional pero recomendado)
MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array,
};
```

### Props y Destructuring

```javascript
// ✅ Correcto: Destructuring en parámetros
function ProductCard({ name, price, image }) {
  return <div>{name}</div>;
}

// ❌ Evitar: Acceder a props.x repetidamente
function ProductCard(props) {
  return <div>{props.name}</div>;
}
```

### Renderizado Condicional

```javascript
// ✅ Correcto: Operador ternario para if-else
{isLoading ? <Spinner /> : <Content />}

// ✅ Correcto: && para mostrar/ocultar
{hasError && <ErrorMessage />}

// ❌ Evitar: Lógica compleja en JSX
{isLoading && !hasError && data.length > 0 && (
  <ComplexComponent />
)}

// ✅ Mejor: Extraer a variable
const shouldShowContent = isLoading && !hasError && data.length > 0;
{shouldShowContent && <ComplexComponent />}
```

---

## 🔄 Estado y Context

### Cuándo usar useState vs useContext

**useState**: Estado local del componente
```javascript
// Para datos que solo afectan a un componente
const [isOpen, setIsOpen] = useState(false);
```

**useContext**: Estado compartido entre múltiples componentes
```javascript
// Para datos que necesitan varios componentes
const { user, login, logout } = useAuth();
```

### Optimización con useMemo y useCallback

```javascript
// ✅ Correcto: Memorizar cálculos costosos
const expensiveCalculation = useMemo(() => {
  return items.filter(/* lógica compleja */);
}, [items]);

// ✅ Correcto: Memorizar callbacks para evitar re-renders
const handleSubmit = useCallback(() => {
  // Lógica
}, [dependencies]);
```

---

## ✅ Validaciones

### Validación de Formularios

```javascript
// ✅ Implementar validación antes de enviar
const validateForm = () => {
  const errors = {};
  
  if (!email.trim()) {
    errors.email = 'El email es requerido';
  } else if (!isValidEmail(email)) {
    errors.email = 'Email inválido';
  }
  
  return errors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validateForm();
  
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
  
  // Proceder con el envío
};
```

### Validación de Datos

```javascript
// ✅ Validar datos recibidos de APIs
const fetchData = async () => {
  try {
    const response = await api.getData();
    
    // Validar estructura antes de usar
    if (!response || !Array.isArray(response.items)) {
      throw new Error('Estructura de datos inválida');
    }
    
    setData(response.items);
  } catch (error) {
    console.error('Error al cargar datos:', error);
    setError(error.message);
  }
};
```

---

## ♿ Accesibilidad

### Etiquetas Semánticas

```jsx
// ✅ Correcto: Usar etiquetas semánticas
<header>
  <nav aria-label="Navegación principal">
    <button aria-label="Abrir menú">☰</button>
  </nav>
</header>

<main>
  <article>
    <h1>Título del artículo</h1>
  </article>
</main>

<footer>
  <address>Información de contacto</address>
</footer>

// ❌ Evitar: Todo con divs
<div className="header">
  <div className="nav">...</div>
</div>
```

### Atributos ARIA

```jsx
// Labels para inputs
<label htmlFor="email">Email</label>
<input 
  id="email" 
  type="email"
  aria-required="true"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? "email-error" : undefined}
/>
{errors.email && (
  <div id="email-error" role="alert">{errors.email}</div>
)}

// Estados de botones
<button 
  aria-label="Agregar al carrito"
  aria-disabled={outOfStock}
  disabled={outOfStock}
>
  Agregar
</button>
```

### Navegación por Teclado

```javascript
// ✅ Permitir navegación con Enter
const handleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
};

<div 
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>
  Clickeable div
</div>
```

---

## ⚡ Rendimiento

### Lazy Loading

```javascript
// ✅ Cargar componentes bajo demanda
const ProductPage = lazy(() => import('./pages/ProductPage'));

<Suspense fallback={<Spinner />}>
  <ProductPage />
</Suspense>
```

### Optimización de Imágenes

```jsx
// ✅ Usar lazy loading y dimensiones
<img 
  src={product.image}
  alt={product.name}
  loading="lazy"
  width={300}
  height={200}
/>
```

### Evitar Re-renders Innecesarios

```javascript
// ✅ Memoizar componentes que no cambian frecuentemente
const MemoizedComponent = React.memo(({ data }) => {
  return <div>{data.name}</div>;
});

// ✅ Usar key apropiadas en listas
{items.map(item => (
  <Item key={item.id} data={item} />
))}
```

---

## 🔍 SEO

### React Helmet

```javascript
import { Helmet } from 'react-helmet';

function ProductPage({ product }) {
  return (
    <>
      <Helmet>
        <title>{product.name} | Pastelería Mil Sabores</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:image" content={product.image} />
      </Helmet>
      
      {/* Contenido */}
    </>
  );
}
```

### URLs Amigables

```javascript
// ✅ URLs descriptivas
/productos/torta-chocolate
/blog/50-anios-de-tradicion

// ❌ URLs con IDs genéricos
/product/123
/post/456
```

---

## 🧪 Testing

### Estructura de Tests

```javascript
describe('ProductCard', () => {
  it('debe renderizar el nombre del producto', () => {
    // Arrange
    const product = { name: 'Torta de Chocolate', price: 15000 };
    
    // Act
    render(<ProductCard product={product} />);
    
    // Assert
    expect(screen.getByText('Torta de Chocolate')).toBeInTheDocument();
  });
  
  it('debe llamar onAddToCart al hacer click', () => {
    // Arrange
    const mockAddToCart = jasmine.createSpy('addToCart');
    const product = { name: 'Torta', price: 10000 };
    
    // Act
    render(<ProductCard product={product} onAddToCart={mockAddToCart} />);
    fireEvent.click(screen.getByText('Agregar'));
    
    // Assert
    expect(mockAddToCart).toHaveBeenCalledWith(product);
  });
});
```

### Cobertura de Tests

Áreas críticas a testear:
- ✅ Validaciones de formularios
- ✅ Lógica de negocio (cálculos, descuentos)
- ✅ Flujos de autenticación
- ✅ Manejo de errores
- ✅ Interacciones del usuario

---

## 🛡️ Seguridad

### Sanitización de Inputs

```javascript
// ✅ Sanitizar datos del usuario
import { sanitizeInput } from './utils/validators';

const handleSubmit = (data) => {
  const cleanData = {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email),
  };
  // Procesar datos limpios
};
```

### Manejo de Tokens

```javascript
// ✅ No exponer tokens en el código
const token = process.env.REACT_APP_API_TOKEN;

// ❌ Evitar hardcodear tokens
const token = 'abc123xyz';
```

---

## 📦 Versionamiento

### Commits Semánticos

```
feat: Agregar filtro por categoría en productos
fix: Corregir validación de fecha en carrito
docs: Actualizar README con instrucciones de instalación
style: Mejorar espaciado en componente Header
refactor: Extraer lógica de validación a utils
test: Agregar tests para CartContext
```

---

## 🔧 Herramientas Recomendadas

- **ESLint**: Linting de código
- **Prettier**: Formateo automático
- **React DevTools**: Debugging
- **Lighthouse**: Auditoría de rendimiento y accesibilidad

---

## 📚 Recursos Adicionales

- [React Docs](https://react.dev/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Web.dev - Best Practices](https://web.dev/learn/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Última actualización:** Octubre 2025
