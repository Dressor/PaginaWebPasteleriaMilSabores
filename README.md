# Pastelería Mil Sabores — Aplicación (Frontend)

Este repositorio contiene la SPA de la pastelería (React, estilo Create React App) y una suite de pruebas basada en Jasmine + Karma (browser tests) junto con utilidades de React Testing Library.

Resumen rápido
- Ejecutar la app en desarrollo: `npm start` (CRA)
- Tests unitarios (Jest / CRA): `npm test` (interactive)
- Tests con Karma + Jasmine (headless Chrome): `npm run test:karma`

Requisitos previos
- Node.js (>=16 recommended) y npm instalados.
- Google Chrome instalado (Karma usa ChromeHeadless); en CI suele venir ya instalado o puedes usar el launcher.

Scripts útiles
- `npm start` — arranca la app en modo desarrollo (http://localhost:3000).
- `npm test` — test runner de Create React App (Jest + RTL) en modo interactivo/watch.
- `npm run test:karma` — ejecuta la suite de pruebas mediante Karma + Jasmine en ChromeHeadless (single run). Útil para CI o cuando quieras ejecutar exactamente la configuración de navegador.
- `npm run build` — crea la versión de producción en `build/`.

Cómo ejecutar las pruebas con Karma (PowerShell)
1. Desde el directorio del proyecto, instala dependencias si no lo has hecho:

```powershell
npm install
```

2. Ejecuta la suite Karma (headless, single-run):

```powershell
npm run test:karma
```

Salida esperada: Karma compilará con webpack y lanzará ChromeHeadless; verás un resumen con tests pasados/fallidos. Si Chrome no está disponible, instala Chrome en el sistema o ajusta `karma.conf.js` para otro launcher.

Notas sobre la configuración de tests
- Este proyecto soporta dos enfoques de testing:
	- Jest + React Testing Library (vía `react-scripts test`) — ideal para desarrollo rápido y snapshots.
	- Karma + Jasmine — ejecuta los tests en un navegador real (configurado para ChromeHeadless). Algunos tests y utilidades (ej. `@testing-library/jest-dom`) están condicionados para no romper cuando se ejecutan bajo Jasmine; ver `src/setupTests.js`.

Seguridad y datos (IMPORTANTE)
- Este repositorio contiene un sistema de autenticación y persistencia local pensado para demo/local development. **NO** es seguro para producción:
	- Los usuarios se almacenan en `localStorage` y las credenciales se guardan en claro en el navegador — esto es inseguro. No usar en producción.
	- Si tu objetivo es producción, mueve la autenticación a un backend seguro que guarde contraseñas hasheadas (bcrypt/argon2) y devuelva tokens de sesión.

Accesibilidad y recomendaciones rápidas
- Se añadieron mejoras a11y y se recomienda:
	- Ejecutar pruebas manuales con lectores de pantalla si planeas producción.
	- Añadir `htmlFor` / `id` en labels de formularios y `role="alert"`/`aria-live` para mensajes dinámicos.

Estrategia de testing recomendada
- Para la mayoría de workflows con CRA recomendamos usar Jest + React Testing Library (`npm test`).
- Mantén `npm run test:karma` disponible si necesitas tests que se ejecuten en un navegador real o en un pipeline que requiera Karma/Jasmine.
