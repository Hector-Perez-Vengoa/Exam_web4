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

:: Limpiar containers anteriores
echo 🧹 Limpiando containers anteriores...
docker-compose down

:: Construir y ejecutar
echo 🏗️ Construyendo y ejecutando aplicación...
docker-compose up --build

echo ✅ Aplicación iniciada!
echo 📱 Frontend: http://localhost
echo 🔧 Backend: http://localhost:8080
echo 📚 API Docs: http://localhost:8080/swagger-ui.html

pause
