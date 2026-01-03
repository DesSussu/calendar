# Configuración de Supabase Storage

Tu calendario ahora usa **Supabase Storage** (gratuito) para almacenar archivos PDF y otros documentos de eventos.

## Por qué Supabase

✅ **500 MB de almacenamiento gratuito** (plan Free)  
✅ **Configuración automática** - funciona directo desde localhost  
✅ **Buckets públicos** - URLs directas sin autenticación  
✅ **Fácil de usar** - SDK sencillo para Angular  

---

## Pasos de Configuración

### 1. Crear cuenta en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en **Start your project**
3. Registra con tu email o GitHub
4. Confirma tu cuenta en el email que recibes

### 2. Crear un nuevo proyecto

1. En el dashboard, haz clic en **New project**
2. Rellena:
   - **Name**: `Calendar` (o el nombre que prefieras)
   - **Database Password**: Genera una contraseña segura (guárdala)
   - **Region**: Elige la más cercana a ti (ej: `Europe West (London)`)
   - **Pricing Plan**: Selecciona **Free** (0$/mes)
3. Haz clic en **Create new project**
4. Espera 1-2 minutos mientras Supabase provisiona tu proyecto

### 3. Obtener las credenciales

1. En tu proyecto, ve a **Settings** (⚙️ icono en el sidebar)
2. Haz clic en **API**
3. Copia estos dos valores:
   - **Project URL** (ej: `https://abcdefgh.supabase.co`)
   - **anon / public** key (una clave larga que empieza con `eyJ...`)

### 4. Crear el bucket de almacenamiento

1. En el sidebar, ve a **Storage**
2. Haz clic en **New bucket**
3. Rellena:
   - **Name**: `calendar-files`
   - **Public bucket**: ✅ **Marcado** (importante para poder acceder sin autenticación)
   - **File size limit**: Puedes dejar el valor por defecto o poner `10 MB`
4. Haz clic en **Create bucket**

### 5. Configurar políticas de acceso (RLS)

1. En el bucket `calendar-files`, haz clic en **Policies**
2. Haz clic en **New policy**
3. Selecciona **For full customization**
4. Añade estas dos políticas:

**Política 1: Permitir subir archivos**
- Policy name: `Allow public upload`
- Allowed operation: `INSERT`
- Target roles: `anon, authenticated`
- Policy definition:
```sql
true
```

**Política 2: Permitir leer archivos**
- Policy name: `Allow public read`
- Allowed operation: `SELECT`
- Target roles: `anon, authenticated`
- Policy definition:
```sql
true
```

### 6. Actualizar `environment.ts`

1. Abre el archivo `src/environments/environment.ts`
2. Añade la configuración de Supabase con tus credenciales:

```typescript
export const environment = {
  production: false,
  firebase: {
    // ... tu configuración actual de Firebase ...
  },
  supabase: {
    url: "https://TU_PROJECT_URL.supabase.co",
    anonKey: "eyJ...TU_ANON_KEY_AQUI"
  }
};
```

3. Guarda el archivo

---

## Verificar que funciona

1. Asegúrate de que el servidor de desarrollo esté corriendo:
```bash
npm run start
```

2. Abre tu calendario en `http://localhost:4200`

3. Crea un nuevo evento y adjunta un archivo PDF

4. El archivo debería subirse sin errores

5. Verifica en Supabase Dashboard → Storage → `calendar-files` que el archivo aparece

---

## Límites del plan gratuito

| Recurso | Límite |
|---------|--------|
| Almacenamiento | 500 MB |
| Transferencia | 2 GB/mes |
| Solicitudes | Ilimitadas |

Para uso personal con PDFs de eventos, estos límites son más que suficientes.

---

## Solución de problemas

### Error: "Bucket not found"
- Verifica que creaste el bucket con el nombre exacto `calendar-files`
- Comprueba que el bucket es **público**

### Error: "Invalid API key"
- Verifica que copiaste la **anon / public** key (no la service_role key)
- Comprueba que no hay espacios al inicio o final de la clave

### Error: "Row Level Security policy violation"
- Asegúrate de haber creado las políticas de acceso (paso 5)
- Verifica que las políticas están habilitadas

### Los archivos no se ven
- Comprueba que el bucket es **público**
- Verifica en el dashboard de Supabase que los archivos están ahí
- Revisa la consola del navegador para ver errores

---

¿Necesitas ayuda? Revisa los errores en la consola del navegador (F12) y busca mensajes de Supabase.
