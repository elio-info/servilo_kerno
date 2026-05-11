#!/usr/bin/env bash
# Seed script: importa los datos iniciales desde database_cvs/upr data/ al MongoDB en Docker.
# Uso: ./scripts/seed.sh [--drop]
#   --drop  elimina y recrea cada colección antes de importar (útil para reset total)

set -euo pipefail

CONTAINER="servilo_kerno_mongo"
DB_NAME="senfima_kerno"
DATA_DIR="$(cd "$(dirname "$0")/../database_cvs/upr data" && pwd)"

# Leer credenciales del .env del proyecto
ENV_FILE="$(cd "$(dirname "$0")/.." && pwd)/.env"
if [[ -f "$ENV_FILE" ]]; then
  MONGO_USER=$(grep '^MONGO_USER=' "$ENV_FILE" | cut -d'=' -f2)
  MONGO_PASS=$(grep '^MONGO_PASS=' "$ENV_FILE" | cut -d'=' -f2)
else
  echo "ERROR: no se encontró .env en la raíz del proyecto"
  exit 1
fi

DROP_FLAG=""
if [[ "${1:-}" == "--drop" ]]; then
  DROP_FLAG="--drop"
  echo "⚠  Modo --drop: se eliminarán las colecciones existentes antes de importar."
fi

# Verificar que el contenedor esté corriendo
if ! docker ps --filter "name=^${CONTAINER}$" --format "{{.Names}}" | grep -q "^${CONTAINER}$"; then
  echo "ERROR: el contenedor '$CONTAINER' no está corriendo."
  echo "Levanta los servicios con: docker compose up -d"
  exit 1
fi

import_collection() {
  local collection="$1"
  local file="${DATA_DIR}/senfima_kerno.${collection}.json"

  if [[ ! -f "$file" ]]; then
    echo "  [SKIP] $collection — archivo no encontrado: $file"
    return
  fi

  echo -n "  Importando $collection ... "
  docker exec -i "$CONTAINER" mongoimport \
    --username "$MONGO_USER" \
    --password "$MONGO_PASS" \
    --authenticationDatabase admin \
    --db "$DB_NAME" \
    --collection "$collection" \
    --jsonArray \
    $DROP_FLAG \
    < "$file" 2>&1 | tail -1
}

echo "================================================"
echo " Seed: $DB_NAME  →  $CONTAINER"
echo "================================================"

import_collection "provinces"
import_collection "municipalities"
import_collection "entity_type"
import_collection "entity"
import_collection "charge"
import_collection "persons"
import_collection "places"
import_collection "categorie"
import_collection "programasocial"
import_collection "consejopopular_municipal"
import_collection "talento_artistico"
import_collection "comunidad_transformacion"
import_collection "proyecto_sociocultural_comunitario"
import_collection "nomenclacategorias_contmanifestacion"
import_collection "control_actividadcultural"

echo ""
echo "Seed completado."
