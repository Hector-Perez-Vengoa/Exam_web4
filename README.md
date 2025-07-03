# Exam Perez - Aplicación Full Stack

Este proyecto contiene una aplicación full stack con:
- **Backend**: Spring Boot (Java 17) con API REST
- **Frontend**: React + Vite con Tailwind CSS
- **Base de datos**: PostgreSQL (producción) / H2 (desarrollo local)
- **Containerización**: Docker y Docker Compose

## 🚀 Despliegue en Render

### Prerrequisitos en Render:
1. **PostgreSQL Database**: Crear una base de datos PostgreSQL en Render
2. **Web Service**: Para el backend
3. **Static Site**: Para el frontend

### Pasos de despliegue:
1. Crear PostgreSQL Database en Render
2. Copiar la URL de conexión de PostgreSQL
3. Desplegar el backend con las variables de entorno correspondientes
4. Desplegar el frontend apuntando al backend

Ver documentación detallada en `RENDER_DEPLOYMENT.md`

## 🛠️ Desarrollo Local

### Prerrequisitos
- Docker y Docker Compose instalados
- Git

### Inicio rápido
```bash
# Clonar el repositorio
git clone <tu-repo>
cd <directorio-del-proyecto>

# Ejecutar con PostgreSQL (recomendado)
docker-compose up --build

# O usar el script de inicio interactivo
./start-dev.sh    # Linux/Mac
start-dev.bat     # Windows
```

### Opciones de base de datos:
- **PostgreSQL**: Persistente, ideal para desarrollo y producción
- **H2**: En memoria, solo para pruebas rápidas

### URLs locales
- **Frontend**: http://localhost
- **Backend**: http://localhost:8080
- **API Docs**: http://localhost:8080/swagger-ui.html
- **PostgreSQL**: localhost:5432 (postgres/password)

## 📁 Estructura del proyecto

```
.
├── Exam_Perez/          # Backend Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── from-web/            # Frontend React
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml   # Configuración Docker Compose
├── RENDER_DEPLOYMENT.md # Guía de despliegue en Render
└── start-dev.*         # Scripts de inicio
```

## 🔧 Configuración

### Backend
- **Perfil de desarrollo**: `application.properties` (MySQL)
- **Perfil de producción**: `application-prod.properties` (H2)
- **Puerto**: 8080

### Frontend
- **Desarrollo**: `npm run dev`
- **Producción**: `npm run build`
- **Puerto**: 80 (en Docker)

## 🔐 Seguridad

- Autenticación JWT
- CORS configurado
- Validación de entrada
- Sanitización de datos

## 📊 Características

### Backend
- API REST con Spring Boot
- Autenticación JWT
- Base de datos JPA/Hibernate
- Validación de datos
- Documentación con Swagger/OpenAPI
- Manejo de errores personalizado

### Frontend
- Interfaz moderna con React
- Enrutamiento con React Router
- Estilizado con Tailwind CSS
- Gestión de estado con Context API
- Componentes reutilizables
- Responsive design

## 🧪 Testing

```bash
# Backend
cd Exam_Perez
./mvnw test

# Frontend
cd from-web
npm test
```

## 📝 Licencia

Este proyecto es para fines educativos.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas con el despliegue, revisa:
1. `RENDER_DEPLOYMENT.md` para instrucciones detalladas
2. Los logs de Docker: `docker-compose logs`
3. Los logs de Render en el dashboard

## 🔄 Actualizaciones

Para actualizar la aplicación:
1. Realiza los cambios en tu código
2. Commit y push a tu repositorio
3. Render detectará automáticamente los cambios y redesplegará
