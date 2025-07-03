@echo off

echo 🚀 Iniciando aplicación Exam Perez...

:: Verificar si Docker está instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker no está instalado. Por favor instala Docker primero.
    exit /b 1
)

:: Verificar si Docker Compose está instalado
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose no está instalado. Por favor instala Docker Compose primero.
    exit /b 1
)

:: Preguntar qué tipo de base de datos usar
echo 🗄️ Selecciona la base de datos:
echo 1) PostgreSQL (Recomendado para producción)
echo 2) H2 (Solo para pruebas rápidas)
set /p db_choice=Selecciona (1 o 2): 

if "%db_choice%"=="1" (
    echo 🐘 Usando PostgreSQL...
    set compose_file=docker-compose.yml
) else if "%db_choice%"=="2" (
    echo 🗃️ Usando H2...
    set compose_file=docker-compose.yml
    echo Nota: Para H2, modifica manualmente SPRING_PROFILES_ACTIVE=default en docker-compose.yml
) else (
    echo ❌ Opción no válida. Usando PostgreSQL por defecto.
    set compose_file=docker-compose.yml
)

:: Limpiar containers anteriores
echo 🧹 Limpiando containers anteriores...
docker-compose -f %compose_file% down

:: Construir y ejecutar
echo 🏗️ Construyendo y ejecutando aplicación...
docker-compose -f %compose_file% up --build

echo ✅ Aplicación iniciada!
echo 📱 Frontend: http://localhost
echo 🔧 Backend: http://localhost:8080
echo 📚 API Docs: http://localhost:8080/swagger-ui.html
if "%db_choice%"=="1" (
    echo 🗄️ PostgreSQL: localhost:5432 (postgres/password)
)

pause
