#!/bin/bash
set -e

echo "==> Login a GitHub Container Registry..."
echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$GITHUB_ACTOR" --password-stdin

echo "==> Creando directorios necesarios..."
mkdir -p ./logs ./cert

echo "==> Descargando imagen pre-construida..."
docker compose pull app

echo "==> Levantando servicios..."
docker compose up -d --no-build

echo "==> Limpiando imágenes antiguas..."
docker image prune -f

echo "✓ Deploy completado exitosamente"
