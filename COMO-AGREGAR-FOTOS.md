# 📸 Guía para Agregar Tus Propias Fotos

## 🎯 Opciones para usar tus fotos

Tenés **3 opciones** para agregar tus fotos reales:

---

## ✅ OPCIÓN 1: Usar URLs de fotos en línea (Más Fácil)

### Paso 1: Subir tus fotos a un servicio
- **ImgBB**: https://imgbb.com/ (gratis, sin registro)
- **Imgur**: https://imgur.com/
- **Google Drive** (modo público)

### Paso 2: Obtener el link directo de la imagen
- Subí la foto
- Copiá el link directo (debe terminar en .jpg, .png, etc.)

### Paso 3: Reemplazar las URLs en los archivos

**Para el SLIDER** (`components/PhotoSlider.tsx`):
```typescript
const slides = [
  {
    id: 1,
    image: 'TU_URL_AQUI.jpg', // ← Pegá tu link aquí
    title: 'Todo para empezar el año escolar',
    subtitle: 'Útiles de calidad al mejor precio',
  },
  // ... más slides
];
```

**Para la GALERÍA** (`components/Gallery.tsx`):
```typescript
const galleryItems = [
  {
    id: 1,
    title: 'Cuadernos Personalizados',
    category: 'Personalización',
    image: 'TU_URL_AQUI.jpg', // ← Pegá tu link aquí
    description: 'Cuadernos con diseños únicos',
  },
  // ... más items
];
```

---

## ✅ OPCIÓN 2: Guardar fotos en la carpeta del proyecto

### Paso 1: Crear carpeta para imágenes
```
ilusion-creativa/
  public/
    images/
      slider/
        foto1.jpg
        foto2.jpg
      gallery/
        trabajo1.jpg
        trabajo2.jpg
```

### Paso 2: Copiar tus fotos a estas carpetas

### Paso 3: Referenciar las fotos en el código

**Para el SLIDER**:
```typescript
const slides = [
  {
    id: 1,
    image: '/images/slider/foto1.jpg', // ← Ruta relativa
    title: 'Todo para empezar el año escolar',
    subtitle: 'Útiles de calidad al mejor precio',
  },
];
```

**Para la GALERÍA**:
```typescript
const galleryItems = [
  {
    id: 1,
    title: 'Cuadernos Personalizados',
    category: 'Personalización',
    image: '/images/gallery/trabajo1.jpg', // ← Ruta relativa
    description: 'Cuadernos con diseños únicos',
  },
];
```

---

## ✅ OPCIÓN 3: Usar Next.js Image Optimization (Recomendado para producción)

Esta opción optimiza automáticamente las imágenes para mejor rendimiento.

### Paso 1: Instalar y configurar
Las imágenes van en `public/images/`

### Paso 2: Importar el componente Image de Next.js

**En PhotoSlider.tsx**:
```typescript
import Image from 'next/image';

// Luego cambiar:
<img src={slide.image} alt={slide.title} />

// Por:
<Image
  src={slide.image}
  alt={slide.title}
  fill
  className="object-cover"
/>
```

---

## 🎨 Consejos para las Fotos

### Tamaños recomendados:

**SLIDER (PhotoSlider)**:
- Ancho: 1920px
- Alto: 1080px
- Formato: JPG (más liviano)
- Orientación: Horizontal (landscape)

**GALERÍA (Gallery)**:
- Ancho: 800px - 1200px
- Alto: 800px - 1200px
- Formato: JPG
- Orientación: Cuadrado preferible (se ve mejor en el grid)

### Optimizar fotos antes de subir:
1. **Reducir tamaño**: Usá https://tinypng.com/
2. **Recortar**: Asegurate que las fotos estén bien encuadradas
3. **Iluminación**: Fotos con buena luz se ven mejor

---

## 📝 Ejemplo Completo

### Reemplazar TODAS las fotos del slider:

En `components/PhotoSlider.tsx`, buscá el array `slides` y reemplazalo:

```typescript
const slides = [
  {
    id: 1,
    image: 'https://i.imgur.com/TU_FOTO_1.jpg',
    title: 'Bienvenidos a Ilusión Creativa',
    subtitle: 'Tu librería de confianza',
  },
  {
    id: 2,
    image: '/images/slider/local.jpg',
    title: 'Visitá nuestro local',
    subtitle: 'En Cancharana 5067',
  },
  {
    id: 3,
    image: 'https://i.imgur.com/TU_FOTO_3.jpg',
    title: 'Artículos personalizados',
    subtitle: 'Hacemos realidad tus ideas',
  },
];
```

### Reemplazar TODAS las fotos de la galería:

En `components/Gallery.tsx`, buscá el array `galleryItems`:

```typescript
const galleryItems = [
  {
    id: 1,
    title: 'Cuadernos Personalizados',
    category: 'Personalización',
    image: '/images/gallery/cuadernos.jpg',
    description: 'Diseños únicos para cada alumno',
  },
  {
    id: 2,
    title: 'Artículos de Arte',
    category: 'Arte',
    image: 'https://i.imgur.com/TU_FOTO.jpg',
    description: 'Todo para tus proyectos creativos',
  },
  // Agregá más items copiando y pegando este formato
];
```

---

## ❓ Solución de Problemas

**❌ La foto no se ve:**
- Verificá que la URL sea correcta
- Asegurate que el link termine en .jpg, .png, .webp
- Si usás rutas locales, verificá que la foto esté en `public/`

**❌ La foto se ve pixelada:**
- Usá fotos de mayor resolución
- Mínimo 800x800 px para galería
- Mínimo 1920x1080 px para slider

**❌ La página carga lento:**
- Optimizá tus fotos con TinyPNG
- Reducí el tamaño de archivo (menos de 500KB por foto)

---

## 🚀 ¿Necesitás ayuda?

Si tenés problemas para agregar tus fotos:
1. Asegurate de tener las fotos en formato JPG o PNG
2. Subí las fotos a ImgBB (más fácil)
3. Copiá el link directo
4. Pegalo en el código donde dice `image: 'AQUI'`

¡Y listo! 🎉
