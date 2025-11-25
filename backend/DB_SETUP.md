# Crear base de datos PostgreSQL (PowerShell)

Pasos para crear usuario y base de datos en PostgreSQL en Windows (PowerShell):

1. Abrir PowerShell como administrador y ejecutar psql (ajusta la ruta si es necesario):

```powershell
psql -U postgres
```

2. Crear la base de datos y usuario (reemplaza `miusuario` y `mipassword`):

```sql
CREATE DATABASE pasteleria;
CREATE USER miusuario WITH ENCRYPTED PASSWORD 'mipassword';
GRANT ALL PRIVILEGES ON DATABASE pasteleria TO miusuario;
\q
```

3. Configura variables de entorno en PowerShell (temporal para la sesión):

```powershell
$env:DB_HOST = 'localhost'
$env:DB_PORT = '5432'
$env:DB_NAME = 'pasteleria'
$env:DB_USER = 'miusuario'
$env:DB_PASSWORD = 'mipassword'
$env:JWT_SECRET = 'un-secreto-largo-y-seguro-para-produccion'
```

4. Ejecuta la aplicación con perfil `prod` para usar Postgres:

```powershell
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

Si prefieres usar Docker para PostgreSQL, puedes ejecutar:

```powershell
docker run --name pg-pasteleria -e POSTGRES_DB=pasteleria -e POSTGRES_USER=miusuario -e POSTGRES_PASSWORD=mipassword -p 5432:5432 -d postgres:15
```
