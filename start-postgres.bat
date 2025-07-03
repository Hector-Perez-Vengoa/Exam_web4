@echo off

echo 🐘 Iniciando PostgreSQL local...

:: Verificar si Docker está instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker no está instalado. Por favor instala Docker primero.
    exit /b 1
)

:: Crear y ejecutar solo PostgreSQL
echo 🏗️ Creando contenedor PostgreSQL...
docker run --name exam-postgres ^
    -e POSTGRES_DB=exam_perez_db ^
    -e POSTGRES_USER=postgres ^
    -e POSTGRES_PASSWORD=password ^
    -p 5432:5432 ^
    -d postgres:15-alpine

:: Esperar a que PostgreSQL esté listo
echo ⏳ Esperando a que PostgreSQL esté listo...
timeout /t 10 /nobreak >nul

:: Verificar conexión
echo ✅ Verificando conexión...
docker exec exam-postgres pg_isready -U postgres

if %errorlevel% equ 0 (
    echo 🎉 PostgreSQL está listo!
    echo 📊 Información de conexión:
    echo    Host: localhost
    echo    Puerto: 5432
    echo    Base de datos: exam_perez_db
    echo    Usuario: postgres
    echo    Contraseña: password
    echo.
    echo 🔧 Para conectarte desde tu aplicación Spring Boot:
    echo    spring.datasource.url=jdbc:postgresql://localhost:5432/exam_perez_db
    echo    spring.datasource.username=postgres
    echo    spring.datasource.password=password
    echo.
    echo ⚠️  Para detener PostgreSQL: docker stop exam-postgres
    echo ⚠️  Para eliminar el contenedor: docker rm exam-postgres
) else (
    echo ❌ Error al iniciar PostgreSQL
    exit /b 1
)

pause
