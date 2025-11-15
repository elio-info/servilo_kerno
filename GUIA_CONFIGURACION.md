# 📋 Guía de Configuración - Variables de Entorno y Certificados

Esta guía explica dónde y cómo configurar las variables de entorno y los certificados para Docker.

## 🔐 Variables de Entorno (.env)

### Ubicación
Las variables de entorno se configuran en un archivo llamado **`.env`** en la **raíz del proyecto** (mismo nivel que `docker-compose.yml`).

### Configuración en docker-compose.yml
El archivo `docker-compose.yml` ya está configurado para cargar automáticamente el archivo `.env`:

```yaml
env_file:
  - .env
```

### Crear el archivo .env

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Puerto de la aplicación
PORT=3000

# Base de datos MongoDB
# Formato: mongodb://usuario:password@host:27017/nombre_db?authSource=admin
LOCAL_MONGO_DEV=mongodb://usuario:password@host:27017/nombre_db?authSource=admin
DB_NAME=nombre_base_datos

# Entorno
NODE_ENV=production

# JWT Secret (obligatorio si no usas certificados RSA)
# Si no tienes certificados, la app usará este secreto con algoritmo HS256
JWT_SECRET=tu_secreto_jwt_muy_seguro_aqui

# JWT con certificados RSA (opcional, solo si usas certificados)
# Si tienes certificados, estos se ignoran
JWT_PRIVATE_KEY=opcional_si_tienes_certificados
JWT_PUBLIC_KEY=opcional_si_tienes_certificados
```

### ⚠️ Importante
- El archivo `.env` **NO debe subirse a Git** (ya está en `.gitignore`)
- En producción, crea este archivo directamente en el VPS
- Usa secretos seguros y únicos

---

## 🔑 Certificados JWT (Opcional)

### Opción 1: Usar Certificados RSA (Recomendado para Producción)

Si quieres usar certificados RSA para JWT, coloca los archivos en la carpeta **`cert/`** en la **raíz del proyecto**.

#### Estructura de carpetas:
```
servilo_kerno/
├── cert/
│   ├── key.pem      (clave privada)
│   └── public.pem   (clave pública)
├── docker-compose.yml
├── Dockerfile
└── .env
```

#### Configuración en docker-compose.yml
El archivo `docker-compose.yml` ya está configurado para montar la carpeta `cert/`:

```yaml
volumes:
  - ./cert:/app/cert:ro
```

Esto monta la carpeta `./cert` del host en `/app/cert` dentro del contenedor (solo lectura).

#### Generar certificados RSA

Puedes generar los certificados usando OpenSSL:

```bash
# Crear directorio cert si no existe
mkdir -p cert

# Generar clave privada
openssl genrsa -out cert/key.pem 2048

# Generar clave pública
openssl rsa -in cert/key.pem -pubout -out cert/public.pem
```

O usar un generador online: https://cryptotools.net/rsagen

### Opción 2: Usar Secreto Simple (Más Fácil)

Si **NO** tienes certificados, la aplicación usará automáticamente la variable de entorno `JWT_SECRET` con algoritmo HS256.

Solo necesitas configurar en tu `.env`:
```env
JWT_SECRET=tu_secreto_muy_seguro_aqui
```

---

## 📁 Estructura Completa del Proyecto

```
servilo_kerno/
├── cert/                    # ← Certificados JWT (opcional)
│   ├── key.pem
│   └── public.pem
├── .env                      # ← Variables de entorno (crear este archivo)
├── docker-compose.yml        # ← Configuración Docker
├── Dockerfile                # ← Imagen Docker
├── src/                      # ← Código fuente
├── logs/                     # ← Logs (se crea automáticamente)
└── ...
```

---

## 🚀 Pasos para Configurar en VPS

### 1. Crear archivo .env
```bash
cd servilo_kerno
nano .env
```

Pega el contenido del ejemplo de arriba y ajusta los valores.

### 2. (Opcional) Crear certificados
```bash
mkdir -p cert
openssl genrsa -out cert/key.pem 2048
openssl rsa -in cert/key.pem -pubout -out cert/public.pem
```

### 3. Verificar permisos
```bash
chmod 600 cert/key.pem
chmod 644 cert/public.pem
```

### 4. Desplegar
```bash
docker compose up -d --build
```

---

## ✅ Verificación

### Verificar variables de entorno
```bash
docker compose exec app env | grep -E "PORT|MONGO|JWT|NODE_ENV"
```

### Verificar certificados
```bash
docker compose exec app ls -la /app/cert
```

### Ver logs
```bash
docker compose logs -f app
```

---

## 🔄 Resumen

| Elemento | Ubicación | Configuración Docker |
|----------|-----------|---------------------|
| **Variables de entorno** | Archivo `.env` en raíz | `env_file: - .env` |
| **Certificados JWT** | Carpeta `cert/` en raíz | `volumes: - ./cert:/app/cert:ro` |

---

## 💡 Notas Importantes

1. **Seguridad**: Nunca subas `.env` o `cert/` a Git
2. **Producción**: Usa certificados RSA para mayor seguridad
3. **Desarrollo**: Puedes usar solo `JWT_SECRET` para simplificar
4. **Backup**: Guarda tus certificados y variables de entorno de forma segura



