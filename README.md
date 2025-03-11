# Sistema de Gestión de Tareas

Aplicación full-stack para gestión de tareas con backend en Python/Flask y frontend en React.

## Requisitos Previos

- Docker (v20.10.10+)
- Docker Compose (v2.6.0+)
- Git (opcional)

## Configuración Inicial

1. **Clonar repositorio**:

```bash
git clone https://github.com/tu-usuario/task-manager.git
cd task-manager
```

## Configurar variables de entorno:

Crear archivo .env en backend/ con:

```bash
Copy
MONGO_URI=mongodb://root:example@mongo:27017/taskdb?authSource=admin
DB_NAME=taskdb
API_KEY=mi-clave-secreta
```

Crear archivo .env en frontend/ con:

```bash
Copy
REACT_APP_API_URL=http://localhost:5001/api/v1
REACT_APP_API_KEY=mi-clave-secreta
```

## Ejecución con Docker

Construir y levantar contenedores:

```bash
Copy
docker-compose down -v && docker-compose build --no-cache && docker-compose up -d
```

Servicios disponibles:


Frontend: http://localhost:3000

Backend: http://localhost:5001

MongoDB: mongodb://localhost:27017

Swagger UI: http://localhost:5001/docs

Detener servicios:

bash
Copy
docker-compose down
Documentación de la API
Acceso a Swagger UI
La documentación interactiva está disponible en:
http://localhost:5001/docs

Swagger UI Preview

Endpoints principales
Método Endpoint Descripción
GET /api/v1/tasks Listar todas las tareas
POST /api/v1/tasks Crear nueva tarea
PUT /api/v1/tasks/:id Actualizar tarea
DELETE /api/v1/tasks/:id Eliminar tarea
Autenticación
Incluir header:

http
Copy
X-API-Key: mi-clave-secreta
Especificación OpenAPI
Descargar spec JSON:

bash
Copy
curl http://localhost:5001/swagger.json -o api_spec.json
Desarrollo
Comandos útiles
Ver logs en tiempo real:

bash
Copy
docker-compose logs -f backend frontend
Reconstruir un servicio:

bash
Copy
docker-compose up -d --build frontend
Ejecutar pruebas:

bash
Copy
docker-compose exec backend python -m pytest tests/
docker-compose exec frontend npm test
Configuración para desarrollo
Hot-reload activado para ambos servicios

Volúmenes montados para cambios en caliente:

Backend: Modificaciones en backend/src/ se reflejan al instante

Frontend: Cambios en frontend/src/ recargan automáticamente

Solución de Problemas
Errores comunes
CORS Errors:

Verificar variables CORS_ALLOW_ORIGINS en backend

Limpiar caché del navegador

Variables de entorno no cargadas:

bash
Copy
docker-compose down -v && docker-compose up --force-recreate
Puertos en uso:

bash
Copy
lsof -i :3000 | awk 'NR!=1 {print $2}' | xargs kill -9
Contacto
Para soporte técnico contactar a: tu-email@dominio.com

Copy

Este README incluye:

1. Instrucciones claras de instalación
2. Acceso a la documentación Swagger
3. Endpoints principales de la API
4. Comandos útiles para desarrollo
5. Solución de problemas comunes
6. Información de contacto

Puedes personalizar las secciones de contacto y URLs según tus necesidades específicas.
# Sistema de Gestión de Tareas

Aplicación full-stack para gestión de tareas con backend en Python/Flask y frontend en React.

## Requisitos Previos

- Docker (v20.10.10+)
- Docker Compose (v2.6.0+)
- Git (opcional)

## Configuración Inicial

1. **Clonar repositorio**:

```bash
git clone https://github.com/tu-usuario/task-manager.git
cd task-manager
```

## Configurar variables de entorno:

Crear archivo .env en backend/ con:

```bash
Copy
MONGO_URI=mongodb://root:example@mongo:27017/taskdb?authSource=admin
DB_NAME=taskdb
API_KEY=mi-clave-secreta
```

Crear archivo .env en frontend/ con:

```bash
Copy
REACT_APP_API_URL=http://localhost:5001/api/v1
REACT_APP_API_KEY=mi-clave-secreta
```

## Ejecución con Docker

1. Construir y levantar contenedores:

```bash
Copy
docker-compose down -v && docker-compose build --no-cache && docker-compose up -d
```

2. Servicios disponibles:

* Frontend: http://localhost:3000
* Backend: http://localhost:5001
* MongoDB: mongodb://localhost:27017
* Swagger UI: http://localhost:5001/docs

3. Detener servicios:

```bash
Copy
docker-compose down
```

## Documentación de la API

Acceso a Swagger UI
La documentación interactiva está disponible en:
http://localhost:5001/docs

#### Swagger UI Preview

* GET /api/v1/tasks Listar todas las tareas
* POST /api/v1/tasks Crear nueva tarea
* PUT /api/v1/tasks/:id Actualizar tarea
* DELETE /api/v1/tasks/:id Eliminar tarea

#### Autenticación
Incluir header:

```bash
http
Copy
X-API-Key: mi-clave-secreta
```

#### Especificación OpenAPI

Descargar spec JSON:

```bash
curl http://localhost:5001/swagger.json -o api_spec.json
```

## Desarrollo

Reconstruir un servicio:

```bash
docker-compose up -d --build frontend
```
#### Configuración para desarrollo

* Hot-reload activado para ambos servicios
* Volúmenes montados para cambios en caliente:
  * Backend: Modificaciones en backend/src/ se reflejan al instante
  * Frontend: Cambios en frontend/src/ recargan automáticamente

## Solución de Problemas

Errores comunes

1. CORS Errors:
  * Verificar variables CORS_ALLOW_ORIGINS en backend
  * Limpiar caché del navegador


2. Variables de entorno no cargadas:

```bash
docker-compose down -v && docker-compose up --force-recreate
```

3. Puertos en uso:

```bash
lsof -i :3000 | awk 'NR!=1 {print $2}' | xargs kill -9
```