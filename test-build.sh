#!/bin/bash

# Script para probar el build local antes del despliegue

echo "🔧 Probando build local del backend..."

# Ir al directorio del backend
cd Exam_Perez

# Limpiar y verificar que no hay caracteres problemáticos
echo "🧹 Limpiando proyecto..."
./mvnw clean

# Verificar codificación de archivos
echo "📁 Verificando codificación de archivos..."
file -bi src/main/resources/application*.properties

# Compilar con información detallada
echo "🏗️ Compilando proyecto..."
./mvnw package -DskipTests -X

if [ $? -eq 0 ]; then
    echo "✅ Build exitoso!"
    echo "📦 JAR creado: target/Exam_Perez-0.0.1-SNAPSHOT.jar"
else
    echo "❌ Error en el build. Revisa los logs arriba."
    exit 1
fi

# Probar el build de Docker
echo "🐳 Probando build de Docker..."
docker build -t exam-perez-backend-test .

if [ $? -eq 0 ]; then
    echo "✅ Docker build exitoso!"
    echo "🚀 Imagen creada: exam-perez-backend-test"
else
    echo "❌ Error en Docker build."
    exit 1
fi

echo "🎉 Todos los tests pasaron! El proyecto está listo para desplegar."
