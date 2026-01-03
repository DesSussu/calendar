# 🎉 Almacenamiento de archivos configurado con Supabase

## ✅ Cambios completados

- ✅ Instalado `@supabase/supabase-js`
- ✅ Actualizado `events.service.ts` para subir archivos a **Supabase Storage** (gratuito)
- ✅ Eliminadas las dependencias de Firebase Storage
- ✅ Configuración lista para PDFs y otros documentos

---

## 📋 Próximos pasos (tú)

### 1. Crear cuenta en Supabase

Ve a [https://supabase.com](https://supabase.com) y regístrate (gratis, 500 MB).

### 2. Seguir la guía completa

Abre el archivo [SUPABASE-SETUP.md](./SUPABASE-SETUP.md) y sigue los pasos:
1. Crear proyecto
2. Obtener URL y anon key
3. Crear bucket público `calendar-files`
4. Configurar políticas de acceso
5. Actualizar `src/environments/environment.ts` con tus credenciales

### 3. Probar

Una vez configurado Supabase:
```bash
npm run start
```

Abre `http://localhost:4200`, crea un evento y adjunta un PDF. ¡Debería funcionar sin errores!

---

## 💡 Ventajas de Supabase

- ✅ **Gratuito** para uso personal (500 MB)
- ✅ **Funciona directo** desde localhost sin configuración extra
- ✅ **URLs públicas** - enlaces directos a tus archivos
- ✅ **Fácil** - solo necesitas 2 valores (URL + key)

---

## ❓ ¿Necesitas ayuda?

Lee [SUPABASE-SETUP.md](./SUPABASE-SETUP.md) - tiene capturas de pantalla y solución de problemas.

**Tiempo estimado**: 5-10 minutos para configurar todo.
