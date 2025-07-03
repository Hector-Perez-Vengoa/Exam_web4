# Configuración para despliegue en Render

## 🛠️ Solución a problemas de codificación

Si encuentras errores como `MalformedInputException` durante el build, es debido a problemas de codificación en los archivos `.properties`. La solución incluye:

1. **Archivos .properties**: Usar solo caracteres ASCII (sin acentos)
2. **Configuración Maven**: UTF-8 configurado en `pom.xml`
3. **Dockerfile**: Variables de entorno para codificación UTF-8

## 🧪 Pruebas antes del despliegue

Ejecuta estos comandos para verificar que todo funciona:

```bash
# Probar build local
./test-build.sh    # Linux/Mac
test-build.bat     # Windows

# O manualmente
cd Exam_Perez
./mvnw clean package -DskipTests
docker build -t test-backend .
```

## Backend (Spring Boot)
Para desplegar el backend en Render:

1. **Tipo de servicio**: Web Service
2. **Runtime**: Docker
3. **Dockerfile**: Usar el Dockerfile en la carpeta `Exam_Perez/`
4. **Variables de entorno**:
   - `SPRING_PROFILES_ACTIVE=prod`
   - `JAVA_OPTS=-Xmx512m -Xms256m`
   - `PORT=8080`

## Frontend (React/Vite)
Para desplegar el frontend en Render:

1. **Tipo de servicio**: Static Site
2. **Build Command**: `npm run build`
3. **Publish Directory**: `dist`
4. **Variables de entorno**:
   - `VITE_API_BASE_URL=https://tu-backend-render.onrender.com/api`

### Alternativa: Frontend como Web Service
Si prefieres desplegar el frontend como un Web Service usando Docker:

1. **Tipo de servicio**: Web Service
2. **Runtime**: Docker
3. **Dockerfile**: Usar el Dockerfile en la carpeta `from-web/`
4. **Variables de entorno**:
   - `VITE_API_BASE_URL=https://tu-backend-render.onrender.com/api`

## Pasos para desplegar:

### Backend:
1. Conecta tu repositorio a Render
2. Crea un nuevo Web Service
3. Selecciona la carpeta `Exam_Perez` como root directory
4. Configura las variables de entorno mencionadas arriba
5. Despliega

### Frontend:
1. Crea un nuevo Static Site (o Web Service si usas Docker)
2. Selecciona la carpeta `from-web` como root directory
3. Configura el build command: `npm run build`
4. Configura el publish directory: `dist`
5. Agrega la variable de entorno `VITE_API_BASE_URL` con la URL de tu backend
6. Despliega

## Configuración de CORS
Asegúrate de que tu backend permita requests desde el dominio de tu frontend en Render.
Agrega la configuración de CORS en tu aplicación Spring Boot.

## Configuración de Base de Datos
El backend está configurado para usar H2 en memoria en producción (`application-prod.properties`).
Si necesitas una base de datos persistente, considera usar:
- PostgreSQL (recomendado para Render)
- MySQL (si tienes un servicio externo)

## Comandos útiles para desarrollo local:

```bash
# Construir y ejecutar con Docker Compose
docker-compose up --build

# Construir solo el backend
docker build -t exam-perez-backend ./Exam_Perez

# Construir solo el frontend  
docker build -t exam-perez-frontend ./from-web

# Ejecutar solo el backend
docker run -p 8080:8080 exam-perez-backend

# Ejecutar solo el frontend
docker run -p 80:80 exam-perez-frontend
```
