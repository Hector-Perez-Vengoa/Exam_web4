-- Script de inicialización para PostgreSQL
-- Este script se ejecuta automáticamente cuando se crea el contenedor de PostgreSQL

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS exam_perez_db;

-- Configurar la base de datos para UTF-8
ALTER DATABASE exam_perez_db SET client_encoding TO 'UTF8';
ALTER DATABASE exam_perez_db SET default_text_search_config TO 'pg_catalog.english';

-- Crear usuario adicional si es necesario (opcional)
-- CREATE USER exam_user WITH ENCRYPTED PASSWORD 'exam_password';
-- GRANT ALL PRIVILEGES ON DATABASE exam_perez_db TO exam_user;

-- Configuraciones adicionales para optimización
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET log_statement = 'all';
ALTER SYSTEM SET log_min_duration_statement = 1000;

-- Reiniciar configuración
SELECT pg_reload_conf();
