# 🎨 Librería Ilusión Creativa - Landing Page

Landing page moderna y responsive para la librería "Ilusión Creativa" de Itaembé Guazú.

## 🚀 Tecnologías Utilizadas

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (iconos)

## ✨ Características

- ✅ Diseño responsive (mobile-first)
- ✅ Animaciones suaves y transiciones
- ✅ Integración directa con WhatsApp
- ✅ Paleta de colores personalizada inspirada en el diseño original
- ✅ Componentes reutilizables
- ✅ Optimizado para SEO
- ✅ Código limpio y bien documentado

## 🎨 Paleta de Colores

- **Turquesa**: `#1ab5b5` (color principal)
- **Amarillo Pastel**: `#ffed80`
- **Rosa Suave**: `#ff5fa0`
- **Crema**: `#f5ebd7`
- **Blanco**: `#ffffff`

## 📦 Instalación

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 🏗️ Estructura del Proyecto

```
ilusion-creativa/
├── app/
│   ├── layout.tsx          # Layout principal con metadatos
│   ├── page.tsx            # Página principal (home)
│   └── globals.css         # Estilos globales y Tailwind
├── components/
│   ├── Navbar.tsx          # Barra de navegación
│   ├── Hero.tsx            # Sección hero principal
│   ├── Services.tsx        # Sección de servicios
│   ├── Contact.tsx         # Sección de contacto
│   ├── Footer.tsx          # Pie de página
│   └── WhatsAppButton.tsx  # Componente reutilizable de WhatsApp
├── tailwind.config.js      # Configuración de Tailwind
├── postcss.config.js       # Configuración de PostCSS
└── package.json            # Dependencias del proyecto
```

## 📱 Secciones de la Landing

1. **Hero**: Título principal, subtítulo y CTA de WhatsApp
2. **Slider de Fotos**: Carrusel automático con imágenes del local y productos
3. **Servicios**: 
   - Útiles escolares
   - Fotocopias
   - Artículos personalizados
   - Presupuesto sin cargo
4. **Galería de Trabajos**: Grid de fotos con lightbox interactivo
5. **Contacto**: 
   - Dirección: Cancharana 5067, Itaembé Guazú
   - WhatsApp: 3764895527
   - Botón directo a WhatsApp
6. **Footer**: Información del negocio y links

## 🔧 Personalización

### Cambiar número de WhatsApp
Buscar `3764895527` en los componentes y reemplazar por tu número.

### Modificar colores
Editar el archivo `tailwind.config.js` en la sección `theme.extend.colors`.

### Ajustar horarios
Modificar el componente `Contact.tsx` en la sección de horarios.

### Agregar tus propias fotos
**¡IMPORTANTE!** Las fotos actuales son de ejemplo de Unsplash.
Para agregar tus propias fotos del local y trabajos:

1. **Leer la guía completa**: `COMO-AGREGAR-FOTOS.md`
2. **Opción fácil**: Subir fotos a ImgBB.com y copiar el link
3. **Reemplazar URLs** en:
   - `components/PhotoSlider.tsx` (slider de fotos)
   - `components/Gallery.tsx` (galería de trabajos)

Ver archivo `COMO-AGREGAR-FOTOS.md` para instrucciones paso a paso.

### Cambiar textos
Todos los textos están en español y son fáciles de modificar directamente en cada componente.

## 🌐 Despliegue

### Vercel (Recomendado)
```bash
npm run build
```
Luego conectar el repositorio a Vercel.

### Otros servicios
El proyecto se puede desplegar en cualquier plataforma que soporte Next.js:
- Netlify
- Railway
- AWS Amplify
- Render

## 📝 Notas de Desarrollo

- Los componentes están separados para facilitar el mantenimiento
- Se usa TypeScript para mayor seguridad de tipos
- Todos los componentes tienen comentarios JSDoc
- El diseño es mobile-first (se ve primero en móviles)
- Las animaciones son sutiles para no distraer

## 🎯 Próximas Mejoras Sugeridas

- [x] Slider de fotos automático
- [x] Galería de trabajos con lightbox
- [ ] Sistema de cotización online
- [ ] Testimonios de clientes
- [ ] Integración con redes sociales
- [ ] Sección de ofertas/promociones
- [ ] Blog o sección de novedades

## 📞 Contacto

**Librería Ilusión Creativa**
- 📍 Cancharana 5067, Itaembé Guazú
- 📱 WhatsApp: 3764895527

---

Hecho con ❤️ para Ilusión Creativa
