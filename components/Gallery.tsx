'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { GalleryItem } from '@/lib/supabase';

/**
 * Componente Gallery - Galería de trabajos realizados
 * Conectado a Supabase para mostrar fotos reales del dashboard
 */
export function Gallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === 0 ? galleryItems.length - 1 : selectedImage - 1);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === galleryItems.length - 1 ? 0 : selectedImage + 1);
  };

  // Manejar teclas del teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, galleryItems.length]);

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
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-turquoise-400 via-soft-pink-400 to-pastel-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* Grid de fotos */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-turquoise-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando galería...</p>
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">Pronto agregaremos trabajos a nuestra galería</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(index)}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in-up border-4 border-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Imagen */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay con info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.category && (
                      <span className="inline-block px-3 py-1 bg-turquoise-500 text-white text-xs font-bold rounded-full mb-2">
                        {item.category}
                      </span>
                    )}
                    <h3 className="text-white font-bold text-xl mb-1">{item.title}</h3>
                    {item.description && (
                      <p className="text-white/90 text-sm">{item.description}</p>
                    )}
                  </div>
                </div>

                {/* Badge de categoría (visible siempre en mobile) */}
                {item.category && (
                  <div className="lg:hidden absolute top-3 left-3 px-3 py-1 bg-turquoise-500 text-white text-xs font-bold rounded-full">
                    {item.category}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
            {/* Botón cerrar */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-300 z-50"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Botón anterior */}
            {galleryItems.length > 1 && (
              <button
                onClick={handlePrevious}
                className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-300 z-50"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Botón siguiente */}
            {galleryItems.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-300 z-50"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Imagen */}
            <div className="relative max-w-6xl max-h-[90vh] w-full mx-4">
              <img
                src={galleryItems[selectedImage].image}
                alt={galleryItems[selectedImage].title}
                className="w-full h-full object-contain rounded-lg"
              />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                {galleryItems[selectedImage].category && (
                  <span className="inline-block px-3 py-1 bg-turquoise-500 text-white text-xs font-bold rounded-full mb-2">
                    {galleryItems[selectedImage].category}
                  </span>
                )}
                <h3 className="text-white font-bold text-2xl mb-1">
                  {galleryItems[selectedImage].title}
                </h3>
                {galleryItems[selectedImage].description && (
                  <p className="text-white/90">{galleryItems[selectedImage].description}</p>
                )}
                <p className="text-white/60 text-sm mt-2">
                  {selectedImage + 1} / {galleryItems.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
