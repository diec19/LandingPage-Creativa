'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

/**
 * Componente Gallery - Galería de trabajos realizados
 * Incluye grid responsive y lightbox para ver imágenes en grande
 */
export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Array de trabajos realizados
  // IMPORTANTE: Reemplazá estas URLs con las fotos reales de tus trabajos
  const galleryItems = [
    {
      id: 1,
      title: 'Cuadernos Personalizados',
      category: 'Personalización',
      image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80',
      description: 'Cuadernos con diseños únicos para cada alumno',
    },
    {
      id: 2,
      title: 'Kits Escolares Completos',
      category: 'Útiles',
      image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80',
      description: 'Sets completos listos para empezar el año',
    },
    {
      id: 3,
      title: 'Cartucheras Decoradas',
      category: 'Personalización',
      image: 'https://images.unsplash.com/photo-1577985051167-0d49eec21977?w=800&q=80',
      description: 'Cartucheras con nombres y diseños personalizados',
    },
    {
      id: 4,
      title: 'Material de Arte',
      category: 'Arte',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
      description: 'Todo lo necesario para proyectos creativos',
    },
    {
      id: 5,
      title: 'Agendas y Organizadores',
      category: 'Personalización',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
      description: 'Agendas personalizadas para el cole',
    },
    {
      id: 6,
      title: 'Mochilas y Accesorios',
      category: 'Útiles',
      image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80',
      description: 'Mochilas de calidad con diseños divertidos',
    },
  ];

  const handlePrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === 0 ? galleryItems.length - 1 : selectedImage - 1);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === galleryItems.length - 1 ? 0 : selectedImage + 1);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage === null) return;
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setSelectedImage(null);
  };

  // Agregar event listener para teclado
  useState(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown as any);
      return () => window.removeEventListener('keydown', handleKeyDown as any);
    }
  });

  return (
    <section id="galeria" className="py-20 px-4 bg-gradient-to-br from-white via-turquoise-50/30 to-pastel-yellow-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-soft-pink-100 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-soft-pink-600" />
            <span className="text-sm font-medium text-soft-pink-700">Nuestros Trabajos</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-turquoise-600 mb-4">
            Galería de Trabajos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mirá algunos de los trabajos que realizamos para nuestros clientes
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-turquoise-400 via-pastel-yellow-400 to-soft-pink-400 mx-auto rounded-full"></div>
        </div>

        {/* Grid de galería */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer animate-fade-in-up bg-white"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(index)}
            >
              {/* Imagen */}
              <div className="aspect-square overflow-hidden bg-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Overlay con información */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                {/* Categoría */}
                <span className="inline-block px-3 py-1 bg-turquoise-500 text-white text-xs font-medium rounded-full mb-2 w-fit">
                  {item.category}
                </span>
                
                {/* Título */}
                <h3 className="text-white font-bold text-xl mb-2">
                  {item.title}
                </h3>
                
                {/* Descripción */}
                <p className="text-white/90 text-sm">
                  {item.description}
                </p>

                {/* Indicador de click */}
                <p className="text-white/70 text-xs mt-3 flex items-center gap-1">
                  <span>Click para ver más</span>
                  <ChevronRight className="w-4 h-4" />
                </p>
              </div>

              {/* Badge decorativo */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA de contacto */}
        <div className="mt-16 text-center bg-gradient-to-r from-turquoise-50 via-pastel-yellow-50 to-soft-pink-50 rounded-3xl p-8 shadow-inner">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            ¿Te gustaría personalizar tus artículos?
          </h3>
          <p className="text-gray-600 mb-6">
            Consultanos sin compromiso y te pasamos presupuesto
          </p>
          <a
            href="#contacto"
            className="inline-block px-8 py-3 bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Contactar ahora
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          {/* Botón cerrar */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-300 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navegación anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navegación siguiente */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Imagen y contenido */}
          <div
            className="max-w-5xl w-full mx-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen principal */}
            <div className="w-full max-h-[70vh] mb-6">
              <img
                src={galleryItems[selectedImage].image}
                alt={galleryItems[selectedImage].title}
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>

            {/* Información de la imagen */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white max-w-2xl">
              <span className="inline-block px-3 py-1 bg-turquoise-500 text-white text-xs font-medium rounded-full mb-3">
                {galleryItems[selectedImage].category}
              </span>
              <h3 className="text-2xl font-bold mb-2">
                {galleryItems[selectedImage].title}
              </h3>
              <p className="text-white/90">
                {galleryItems[selectedImage].description}
              </p>
              <p className="text-white/60 text-sm mt-4">
                {selectedImage + 1} / {galleryItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
