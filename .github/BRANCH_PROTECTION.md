# 🔒 Configuración de Protección de Ramas

Para que el workflow de validación de PR bloquee automáticamente los merges cuando hay conflictos o fallan las validaciones, necesitas configurar las **Branch Protection Rules** en GitHub.

## 📋 Pasos para Configurar

### 1. Ir a la Configuración del Repositorio

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Branches** (Ramas)

### 2. Agregar una Regla de Protección

1. Haz clic en **Add rule** (Agregar regla) o **Add branch protection rule**
2. En **Branch name pattern**, ingresa el nombre de tu rama principal (por ejemplo: `main` o `master`)

### 3. Configurar las Opciones de Protección

Activa las siguientes opciones:

#### ✅ Requerimientos Básicos

- ✅ **Require a pull request before merging** (Requerir un PR antes de hacer merge)
  - ✅ **Require approvals** (Requerir aprobaciones) - Opcional, pero recomendado
  - ✅ **Dismiss stale pull request approvals when new commits are pushed** (Descartar aprobaciones cuando se suben nuevos commits)

#### ✅ Status Checks (Checks de Estado) - **IMPORTANTE**

- ✅ **Require status checks to pass before merging** (Requerir que los checks de estado pasen antes de hacer merge)
  - ✅ **Require branches to be up to date before merging** (Requerir que las ramas estén actualizadas)
  
  En la lista de checks, marca:
  - ✅ **Verificar Conflictos de Merge** (check-conflicts)
  - ✅ **Verificar Dependencias** (check-dependencies)
  - ✅ **Validar Código (Lint, Build, Tests)** (validate-code)
  - ✅ **Verificar Inicio de Aplicación** (check-app-startup)

#### ✅ Otras Opciones Recomendadas

- ✅ **Require conversation resolution before merging** (Requerir resolución de conversaciones)
- ✅ **Do not allow bypassing the above settings** (No permitir omitir las configuraciones anteriores) - Solo para administradores
- ✅ **Include administrators** (Incluir administradores) - Opcional, pero recomendado para mantener consistencia

### 4. Guardar la Configuración

Haz clic en **Create** (Crear) o **Save changes** (Guardar cambios)

## 🎯 Resultado

Una vez configurado, cuando un PR tenga:
- ❌ Conflictos de merge
- ❌ Dependencias faltantes
- ❌ Errores de lint o build
- ❌ Problemas al iniciar la aplicación

**El botón de merge estará deshabilitado** y mostrará un mensaje indicando qué checks fallaron.

## 📝 Notas Importantes

1. **Los checks deben ejecutarse al menos una vez** antes de que aparezcan en la lista de status checks disponibles.

2. **El workflow debe tener el nombre correcto**: El nombre del job en el workflow debe coincidir con el que seleccionas en las branch protection rules.

3. **Permisos del GITHUB_TOKEN**: El workflow usa `GITHUB_TOKEN` que tiene permisos limitados. Si necesitas más permisos, puedes crear un Personal Access Token (PAT) y agregarlo como secret.

## 🔍 Verificar que Funciona

1. Crea un PR con conflictos intencionales
2. El workflow debería fallar en el job "Verificar Conflictos de Merge"
3. El botón de merge debería estar deshabilitado
4. Deberías ver un comentario automático en el PR explicando los conflictos

## 🛠️ Troubleshooting

### El botón de merge sigue habilitado aunque hay conflictos

- Verifica que las branch protection rules estén activas
- Verifica que el nombre del check en las reglas coincida con el nombre del job
- Verifica que el workflow se haya ejecutado al menos una vez
- Verifica que el workflow tenga permisos para actualizar el estado del check

### El workflow no puede comentar en el PR

- Verifica que `GITHUB_TOKEN` tenga permisos de escritura
- En Settings > Actions > General, verifica que "Workflow permissions" esté configurado como "Read and write permissions"

