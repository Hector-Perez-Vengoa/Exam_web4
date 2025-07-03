# 🛍️ Sistema de Gestión de Productos

Un sistema moderno de gestión de productos desarrollado con **React**, **Vite** y **Tailwind CSS**, diseñado para trabajar con una API REST de Spring Boot que incluye autenticación JWT y autorización basada en roles.

## ✨ Características Principales

### 🔐 **Sistema de Autenticación y Autorización**
- **Autenticación JWT** con tokens de acceso seguros
- **Roles de usuario**: Administrador y Usuario estándar
- **Permisos granulares** basados en roles
- **Protección de rutas** automática
- **Interceptores HTTP** para manejo automático de tokens

### 👥 **Gestión de Roles**

#### 🚀 **Administrador (ADMIN)**
- ✅ **Ver productos**: Acceso completo a todos los productos
- ✅ **Crear productos**: Puede agregar nuevos productos al inventario
- ✅ **Editar productos**: Modificar información de productos existentes
- ✅ **Eliminar productos**: Remover productos del sistema
- ✅ **Estadísticas avanzadas**: Acceso a métricas detalladas
- ✅ **Gestión de usuarios**: Ver información de usuarios activos

#### 👤 **Usuario Estándar (USER)**
- ✅ **Ver productos**: Solo lectura del catálogo
- ✅ **Buscar y filtrar**: Funciones de búsqueda completas
- ❌ **Crear productos**: Restringido
- ❌ **Editar productos**: Restringido  
- ❌ **Eliminar productos**: Restringido
- **Interfaz moderna**: Diseño responsive con Tailwind CSS
- **Dashboard interactivo**: Estadísticas y gestión de productos

## 🛠️ Tecnologías Utilizadas

- **React 19** - Biblioteca de JavaScript para interfaces de usuario
- **React Router DOM** - Navegación entre páginas
- **Axios** - Cliente HTTP para comunicación con la API
- **Tailwind CSS** - Framework de CSS utilitario
- **Lucide React** - Iconos modernos
- **Vite** - Herramienta de desarrollo rápida

## 📋 Prerrequisitos

Antes de ejecutar la aplicación, asegúrate de tener:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **API Backend** ejecutándose en `http://localhost:8080`

## 🚀 Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone <repository-url>
   cd from-web
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar la URL de la API:**
   
   Edita el archivo `src/config/api.js` si tu API no está en `http://localhost:8080`:
   ```javascript
   const API_BASE_URL = 'http://tu-api-url/api';
   ```

4. **Ejecutar la aplicación:**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:**
   ```
   http://localhost:5173
   ```

## 👥 Usuarios de Prueba

La aplicación funciona con los usuarios predefinidos en el backend:

### Administrador
- **Usuario:** `admin`
- **Contraseña:** `admin123`
- **Permisos:** Acceso completo (CRUD de productos)

### Usuario Normal
- **Usuario:** `usuario`
- **Contraseña:** `user123`
- **Permisos:** Solo lectura de productos

## 🎯 Funcionalidades por Rol

### Usuario Normal (USER)
- ✅ Ver lista de productos
- ✅ Ver detalles de productos
- ✅ Buscar y filtrar productos
- ✅ Ver estadísticas básicas

### Administrador (ADMIN)
- ✅ Todo lo anterior +
- ✅ Crear nuevos productos
- ✅ Editar productos existentes
- ✅ Eliminar productos
- ✅ Ver productos con stock bajo

## 📱 Características de la Interfaz

### Dashboard Principal
- **Tarjetas de estadísticas**: Total de productos, stock bajo, categorías
- **Barra de búsqueda**: Búsqueda en tiempo real
- **Filtro por categoría**: Filtrado dinámico
- **Grilla de productos**: Vista de tarjetas responsive
- **Acciones por rol**: Botones visibles según permisos

### Modal de Productos
- **Modo vista**: Solo lectura de información
- **Modo creación**: Formulario para nuevo producto
- **Modo edición**: Formulario con datos precargados
- **Validaciones**: Validación de campos requeridos
- **Alertas de stock**: Aviso para stock bajo

### Autenticación
- **Login responsive**: Formulario moderno con validaciones
- **Registro de usuarios**: Creación de nuevas cuentas
- **Manejo de errores**: Mensajes claros de error
- **Tokens JWT**: Manejo automático de tokens

## 🔧 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Login.jsx       # Página de inicio de sesión
│   ├── Register.jsx    # Página de registro
│   ├── Dashboard.jsx   # Dashboard principal
│   ├── ProductModal.jsx # Modal para productos
│   └── ProtectedRoute.jsx # Ruta protegida
├── context/
│   └── AuthContext.jsx # Contexto de autenticación
├── services/
│   └── apiService.js   # Servicios de API
├── config/
│   └── api.js          # Configuración de Axios
├── App.jsx             # Componente principal
├── main.jsx           # Punto de entrada
└── main.css           # Estilos globales
```

## 🔗 Endpoints de la API Utilizados

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario
- `GET /api/auth/validate` - Validar token
- `GET /api/auth/me` - Información del usuario

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/{id}` - Obtener producto por ID
- `POST /api/products` - Crear producto (ADMIN)
- `PUT /api/products/{id}` - Actualizar producto (ADMIN)
- `DELETE /api/products/{id}` - Eliminar producto (ADMIN)
- `GET /api/products/search` - Buscar productos
- `GET /api/products/category/{category}` - Productos por categoría
- `GET /api/products/low-stock` - Productos con stock bajo (ADMIN)

## 🎨 Personalización

### Colores y Tema
Los colores principales se pueden modificar en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

### Configuración de API
Para cambiar la URL base de la API, edita `src/config/api.js`:

```javascript
const API_BASE_URL = 'https://tu-api-en-produccion.com/api';
```

## 🚀 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Ejecutar en modo desarrollo

# Construcción
npm run build        # Construir para producción
npm run preview      # Previsualizar build de producción

# Linting
npm run lint         # Ejecutar ESLint
```

## 🔒 Seguridad

- **JWT Tokens**: Almacenados en localStorage
- **Interceptors**: Axios intercepta requests/responses automáticamente
- **Rutas protegidas**: Verificación de autenticación en cada ruta
- **Autorización**: Verificación de roles para acciones específicas
- **Logout automático**: Redireccionamiento automático al expirar token

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 **Móviles** (320px+)
- 📱 **Tablets** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large screens** (1280px+)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📝 Notas Importantes

- **Backend requerido**: Esta aplicación requiere que el backend Spring Boot esté ejecutándose
- **CORS**: Asegúrate de que el backend tenga CORS configurado para `http://localhost:5173`
- **Tokens**: Los tokens JWT se almacenan en localStorage (no recomendado para producción)
- **Validaciones**: Las validaciones principales están en el backend

## 🐛 Solución de Problemas

### Error de CORS
Si ves errores de CORS, verifica que el backend tenga configurado:
```java
@CrossOrigin(origins = "http://localhost:5173")
```

### Error de conexión
Verifica que:
- El backend esté ejecutándose en puerto 8080
- La URL en `src/config/api.js` sea correcta
- No haya firewall bloqueando las conexiones

### Tokens no válidos
Si los tokens expiran constantemente:
- Verifica la configuración JWT en el backend
- Considera implementar refresh tokens

## 👨‍💻 Autor

**Estudiante Pérez**  
Tecsup - Desarrollo de Aplicaciones Web  
Email: estudiante@tecsup.edu.pe+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
