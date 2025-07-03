#!/bin/bash

# Script para inicializar PostgreSQL local rápidamente

echo "🐘 Iniciando PostgreSQL local..."

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor instala Docker primero."
    exit 1
fi

# Crear y ejecutar solo PostgreSQL
echo "🏗️ Creando contenedor PostgreSQL..."
docker run --name exam-postgres \
    -e POSTGRES_DB=exam_perez_db \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=password \
    -p 5432:5432 \
    -d postgres:15-alpine

# Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté listo..."
sleep 10

# Verificar conexión
echo "✅ Verificando conexión..."
docker exec exam-postgres pg_isready -U postgres

if [ $? -eq 0 ]; then
    echo "🎉 PostgreSQL está listo!"
    echo "📊 Información de conexión:"
    echo "   Host: localhost"
    echo "   Puerto: 5432"
    echo "   Base de datos: exam_perez_db"
    echo "   Usuario: postgres"
    echo "   Contraseña: password"
    echo ""
    echo "🔧 Para conectarte desde tu aplicación Spring Boot:"
    echo "   spring.datasource.url=jdbc:postgresql://localhost:5432/exam_perez_db"
    echo "   spring.datasource.username=postgres"
    echo "   spring.datasource.password=password"
    echo ""
    echo "⚠️  Para detener PostgreSQL: docker stop exam-postgres"
    echo "⚠️  Para eliminar el contenedor: docker rm exam-postgres"
else
    echo "❌ Error al iniciar PostgreSQL"
    exit 1
fi
