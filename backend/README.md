 # Backend - Pastelería Mil Sabores
 
 Este directorio contiene un backend básico en Java 17 + Spring Boot para la aplicación "Pastelería Mil Sabores".
 
 Características incluidas:
 - Spring Boot 3
 - Spring Security con JWT (jjwt)
 - Spring Data JPA (entidades: User, Product, Venta, OrderItem, FileEntity)
 - Subida de archivos (almacenados en la base de datos como bytea)
 - Endpoints REST versionados en `/api/v1/*`
 - Swagger UI (springdoc) disponible en `/swagger-ui.html`
 
 ## Requisitos
 - Java 17 JDK
 - Maven
 - PostgreSQL (o usar H2 en memoria para desarrollo)
 
 ## Configuración rápida (desarrollo con H2)
 1. Desde la raíz del proyecto, compilar:
 
 ```powershell
 cd backend
 mvn clean package
 ```
 
 2. Ejecutar la aplicación:
 
 ```powershell
 mvn spring-boot:run
 ```
 
 La API escuchará en `http://localhost:8081` por defecto. Swagger UI en `http://localhost:8081/swagger-ui.html`.
 
 ## Conectar con PostgreSQL (producción / local)
 1. Crear base de datos y usuario en PostgreSQL (ver `DB_SETUP.md` para comandos PowerShell).
 2. Exportar variables de entorno (Windows PowerShell):
 
 ```powershell
 $env:DB_HOST = 'localhost'
 $env:DB_PORT = '5432'
 $env:DB_NAME = 'pasteleria'
 $env:DB_USER = 'miusuario'
 $env:DB_PASSWORD = 'mipassword'
 $env:JWT_SECRET = 'un-secreto-largo-y-seguro-para-produccion'
 ```
 
 3. Ejecutar con perfil `prod` para usar la configuración de Postgres (opcional):
 
 ```powershell
 mvn spring-boot:run -Dspring-boot.run.profiles=prod
 ```
 
 ## Endpoints principales
 - Auth: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`
 - Products: `GET /api/v1/products`, `GET /api/v1/products/{id}`, `POST/PUT/DELETE` (admin)
 - Files: `POST /api/v1/files` (upload, admin), `GET /api/v1/files/{id}`
 - Orders (ventas): `POST /api/v1/orders` (user), `GET /api/v1/orders` (admin list), `GET /api/v1/orders/{id}`
 
 ## Notas de seguridad
 - Cambia la propiedad `jwt.secret` por una variable de entorno segura en producción.
 - Los tokens se envían en `Authorization: Bearer <token>`.
 - Para archivos grandes y producción es recomendable usar almacenamiento externo (S3) en lugar de guardar binarios en la base de datos.
 
 ## Frontend
 - En el frontend (SPA React) se proveen ejemplos de servicios axios en `src/services/*` que apuntan por defecto a `http://localhost:8081/api/v1`.
 - Instala dependencias en el frontend y añade `axios` si no está instalado: `npm install`.
