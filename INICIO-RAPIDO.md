# 🚀 Guía Rápida de Inicio

## Pasos para ejecutar el proyecto:

### 1️⃣ Instalar Node.js
Si no tenés Node.js instalado, descargalo desde: https://nodejs.org/
(Recomendado: versión LTS)

### 2️⃣ Abrir terminal en la carpeta del proyecto
- Windows: Click derecho en la carpeta → "Abrir en Terminal" o "Git Bash Here"
- Mac/Linux: Click derecho → "Abrir en Terminal"

### 3️⃣ Instalar dependencias
```bash
npm install
```
(Esperar a que se instalen todas las dependencias - puede tardar unos minutos)

### 4️⃣ Ejecutar el proyecto
```bash
npm run dev
```

### 5️⃣ Abrir en el navegador
Abrir: http://localhost:3000

¡Listo! Ya deberías ver la landing page funcionando 🎉

## 📝 Comandos útiles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm start` - Ejecutar versión de producción
- `npm run lint` - Verificar código

## 🔧 Solución de problemas

### Error: "npm no se reconoce..."
→ Necesitás instalar Node.js

### Error al instalar dependencias
→ Intentá borrar la carpeta `node_modules` y ejecutar `npm install` nuevamente

### El puerto 3000 está ocupado
→ El proyecto se abrirá automáticamente en otro puerto (ej: 3001)
→ O detené el proceso que está usando el puerto 3000

### Cambios no se reflejan
→ Guardá el archivo y Next.js recargará automáticamente
→ Si no funciona, detené el servidor (Ctrl+C) y ejecutá `npm run dev` nuevamente

## 📱 Personalizar WhatsApp

Buscá en los archivos:
- `components/Hero.tsx`
- `components/Contact.tsx`
- `components/Navbar.tsx`

Y cambiá `3764895527` por tu número de WhatsApp (sin espacios ni guiones)

## 🎨 Personalizar colores

Editá `tailwind.config.js` en la sección de colors para cambiar los colores principales.

## 🌐 Subir a Internet (Gratis con Vercel)

1. Crear cuenta en https://vercel.com
2. Conectar tu repositorio de GitHub
3. Vercel desplegará automáticamente
4. ¡Tu sitio estará online en minutos!

---

¿Necesitás ayuda? Revisá el README.md completo para más detalles.
