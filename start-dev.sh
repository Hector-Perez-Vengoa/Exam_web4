#!/bin/bash

# Script para desarrollo local con Docker

echo "🚀 Iniciando aplicación Exam Perez..."

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor instala Docker primero."
    exit 1
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit 1
fi

# Limpiar containers anteriores
echo "🧹 Limpiando containers anteriores..."
docker-compose down

# Construir y ejecutar
echo "🏗️ Construyendo y ejecutando aplicación..."
docker-compose up --build

echo "✅ Aplicación iniciada!"
echo "📱 Frontend: http://localhost"
echo "🔧 Backend: http://localhost:8080"
echo "📚 API Docs: http://localhost:8080/swagger-ui.html"
