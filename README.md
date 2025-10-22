# Pastelería Mil Sabores - E-commerce Web Application

Aplicación web de e-commerce desarrollada con React para la Pastelería Mil Sabores, una pastelería artesanal con más de 50 años de tradición en Chile.

## 🎯 Características Principales

- 🛒 **Carrito de Compras**: Sistema completo con persistencia local
- 🔐 **Autenticación**: Login seguro con validación de formularios
- 🎨 **Tema Oscuro/Claro**: Cambio dinámico de tema con persistencia
- 💳 **Sistema de Cupones**: Descuentos automáticos y cupones promocionales
- 📱 **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- ♿ **Accesibilidad**: Cumple con estándares WCAG
- 🚀 **Lazy Loading**: Carga optimizada de componentes
- ✅ **Testing**: Suite completa de tests con Karma y Jasmine

## 🛠️ Tecnologías Utilizadas

- **React 18.3.1**: Biblioteca principal
- **React Router 6**: Navegación y ruteo
- **Bootstrap 5**: Framework CSS
- **React Bootstrap**: Componentes React de Bootstrap
- **Framer Motion**: Animaciones fluidas
- **React Helmet**: Gestión de metadatos SEO
- **Karma + Jasmine**: Framework de testing

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/Dressor/PaginaWebPasteleriaMilSabores.git
cd PaginaWebPasteleriaMilSabores
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar la aplicación en modo desarrollo:
```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

## 📜 Scripts Disponibles

### `npm start`

Ejecuta la aplicación en modo desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

La página se recargará automáticamente cuando hagas cambios.\
Los errores de lint se mostrarán en la consola.

### `npm test`

Ejecuta los tests con Karma y Jasmine.\
Los tests se ejecutan en modo watch por defecto.

### `npm run test:karma`

Ejecuta los tests una sola vez (útil para CI/CD).

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.\
Optimiza React en modo producción para el mejor rendimiento.

Los archivos se minimizan y los nombres incluyen hashes.\
¡Tu aplicación está lista para ser desplegada!

## 📂 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Layout.jsx      # Layout principal
│   ├── Header.js       # Barra de navegación
│   ├── Footer.jsx      # Pie de página
│   └── ...
├── pages/              # Páginas de la aplicación
│   ├── Home.js         # Página de inicio
│   ├── Productos.js    # Catálogo de productos
│   ├── Carrito.jsx     # Carrito de compras
│   ├── Login.js        # Inicio de sesión
│   └── ...
├── context/            # Contextos de React
│   ├── CartContext.jsx # Estado global del carrito
│   └── auth.jsx        # Autenticación
├── utils/              # Funciones utilitarias
├── data/               # Datos estáticos
└── styles/             # Estilos CSS

```

## 🔐 Credenciales de Prueba

Para probar el sistema de autenticación:
- **Usuario**: admin
- **Contraseña**: 123456

## 🎨 Sistema de Cupones

La aplicación incluye cupones de descuento:
- **SABOR10**: 10% de descuento (válido hasta 31/12/2025)
- **PASTEL15**: 15% de descuento (válido hasta 30/11/2025)
- **DUOC20**: 20% de descuento (válido hasta 31/10/2025)

### Descuentos Automáticos

- **10%**: En compras sobre $30,000
- **5%**: Reserva con 3+ días de anticipación
- **20%**: Especial aniversario (15 de noviembre)

## ♿ Accesibilidad

- Etiquetas ARIA apropiadas
- Navegación por teclado completa
- Contraste de colores adecuado
- Soporte para lectores de pantalla
- Skip links para navegación rápida

## 🧪 Testing

El proyecto incluye tests automatizados:

```bash
# Ejecutar tests en modo watch
npm test

# Ejecutar tests una vez
npm run test:karma
```

Los tests cubren:
- Componentes principales
- Funcionalidades del carrito
- Sistema de autenticación
- Validaciones de formularios
- Utilidades y helpers

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (320px - 767px)
- 📊 Tablets (768px - 1023px)
- 💻 Desktop (1024px+)

## 🌐 Navegadores Soportados

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

## 🤝 Contribución

Este proyecto fue desarrollado como parte de la evaluación académica para el curso DSY1104.

### Equipo de Desarrollo
- Dazcarategui Team

## 📄 Licencia

Este proyecto es de uso académico.

## 📞 Contacto

- Email: contacto@1000sabores.cl
- Teléfono: +56 9 8765 4321
- Dirección: Av. Principal 1234, Santiago

## 🔗 Enlaces Útiles

- [Documentación de React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Create React App](https://create-react-app.dev/)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
