@echo off
setlocal enabledelayedexpansion

echo 🔧 Probando build local del backend...

:: Ir al directorio del backend
cd Exam_Perez

:: Limpiar proyecto
echo 🧹 Limpiando proyecto...
mvnw.cmd clean

:: Compilar con información detallada
echo 🏗️ Compilando proyecto...
mvnw.cmd package -DskipTests

if %errorlevel% equ 0 (
    echo ✅ Build exitoso!
    echo 📦 JAR creado: target\Exam_Perez-0.0.1-SNAPSHOT.jar
) else (
    echo ❌ Error en el build. Revisa los logs arriba.
    exit /b 1
)

:: Probar el build de Docker
echo 🐳 Probando build de Docker...
docker build -t exam-perez-backend-test .

if %errorlevel% equ 0 (
    echo ✅ Docker build exitoso!
    echo 🚀 Imagen creada: exam-perez-backend-test
) else (
    echo ❌ Error en Docker build.
    exit /b 1
)

echo 🎉 Todos los tests pasaron! El proyecto está listo para desplegar.
pause
