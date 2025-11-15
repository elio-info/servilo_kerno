#!/bin/bash

# Script de despliegue para VPS
# Uso: ./deploy.sh

set -e

echo "🚀 Iniciando despliegue de servilo_kerno..."

# Verificar que existe el archivo .env
if [ ! -f .env ]; then
    echo "⚠️  Advertencia: No se encontró el archivo .env"
    echo "📝 Por favor, crea un archivo .env con las siguientes variables:"
    echo "   PORT=3000"
    echo "   LOCAL_MONGO_DEV=mongodb://usuario:password@host:27017/nombre_db"
    echo "   DB_NAME=nombre_base_datos"
    echo "   NODE_ENV=production"
    echo ""
    read -p "¿Deseas continuar de todas formas? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Detener contenedores existentes
echo "🛑 Deteniendo contenedores existentes..."
docker compose down || true

# Construir y levantar contenedores
echo "🔨 Construyendo imagen Docker..."
docker compose build --no-cache

echo "🚀 Iniciando contenedores..."
docker compose up -d

# Esperar a que el contenedor esté listo
echo "⏳ Esperando a que la aplicación esté lista..."
sleep 10

# Verificar estado
echo "📊 Verificando estado de los contenedores..."
docker compose ps

# Mostrar logs
echo "📋 Últimos logs del contenedor:"
docker compose logs --tail=50 app

echo ""
echo "✅ Despliegue completado!"
echo "🌐 La aplicación está disponible en: http://localhost:${PORT:-3000}"
echo "📚 Swagger disponible en: http://localhost:${PORT:-3000}/cult/api/docs"
echo ""
echo "🌍 Para exponer con dominio betacultura.com:"
echo "   1. Configura DNS apuntando a tu VPS"
echo "   2. Ejecuta: sudo ./setup-nginx.sh"
echo "   3. Ejecuta: sudo certbot --nginx -d betacultura.com -d www.betacultura.com"
echo ""
echo "Para ver los logs en tiempo real, ejecuta:"
echo "   docker compose logs -f app"
echo ""
echo "Para detener la aplicación, ejecuta:"
echo "   docker compose down"



