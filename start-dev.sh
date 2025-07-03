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

# Preguntar qué tipo de base de datos usar
echo "🗄️ Selecciona la base de datos:"
echo "1) PostgreSQL (Recomendado para producción)"
echo "2) H2 (Solo para pruebas rápidas)"
read -p "Selecciona (1 o 2): " db_choice

if [ "$db_choice" = "1" ]; then
    echo "🐘 Usando PostgreSQL..."
    compose_file="docker-compose.yml"
elif [ "$db_choice" = "2" ]; then
    echo "🗃️ Usando H2..."
    # Crear archivo temporal para H2
    compose_file="docker-compose.h2.yml"
    # Copiar y modificar docker-compose para H2
    sed 's/SPRING_PROFILES_ACTIVE=prod/SPRING_PROFILES_ACTIVE=default/' docker-compose.yml > $compose_file
    sed -i '/postgres:/,/networks:/d' $compose_file
    sed -i '/depends_on:/,/condition: service_healthy/d' $compose_file
    sed -i '/DATABASE_/d' $compose_file
else
    echo "❌ Opción no válida. Usando PostgreSQL por defecto."
    compose_file="docker-compose.yml"
fi

# Limpiar containers anteriores
echo "🧹 Limpiando containers anteriores..."
docker-compose -f $compose_file down

# Construir y ejecutar
echo "🏗️ Construyendo y ejecutando aplicación..."
docker-compose -f $compose_file up --build

echo "✅ Aplicación iniciada!"
echo "📱 Frontend: http://localhost"
echo "🔧 Backend: http://localhost:8080"
echo "📚 API Docs: http://localhost:8080/swagger-ui.html"
if [ "$db_choice" = "1" ]; then
    echo "🗄️ PostgreSQL: localhost:5432 (postgres/password)"
fi

# Limpiar archivo temporal si se creó
if [ "$compose_file" = "docker-compose.h2.yml" ]; then
    rm -f $compose_file
fi
