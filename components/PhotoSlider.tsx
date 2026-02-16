'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/supabase';
import Link from 'next/link';

/**
 * Componente PhotoSlider - Slider automático con productos desde Supabase
 * Incluye navegación manual, indicadores y autoplay
 */
export function PhotoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      // Obtener productos destacados con imágenes
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('stock', true)
        .not('image', 'is', null)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Autoplay del slider
  useEffect(() => {
    if (!isAutoPlaying || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    const newIndex = currentSlide === 0 ? products.length - 1 : currentSlide - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentSlide + 1) % products.length;
    goToSlide(newIndex);
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-AR')}`;
  };

  if (loading || products.length === 0) {
    return null; // No mostrar nada si no hay productos
  }

  return (
    <section className="relative py-12 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-turquoise-600 mb-2">
            Productos Destacados
          </h2>
          <p className="text-gray-600">
            Conocé algunos de nuestros mejores productos
          </p>
        </div>

        {/* Contenedor del slider */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
          {/* Slides */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
            {products.map((product, index) => (
              <Link
                key={product.id}
                href={`/producto/${product.id}`}
                className={`absolute inset-0 transition-all duration-700 ease-in-out cursor-pointer ${
                  index === currentSlide
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105'
                }`}
              >
                {/* Imagen de fondo */}
                <img
                  src={product.image || '/placeholder-product.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Badge de oferta */}
                {product.discount_percentage && product.discount_percentage > 0 && (
                  <div className="absolute top-6 right-6 bg-red-600 text-white text-lg font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
                    -{product.discount_percentage}% OFF
                  </div>
                )}

                {/* Badge de categoría */}
                <div className="absolute top-6 left-6 bg-logo-purple text-white text-sm font-bold px-4 py-2 rounded-full">
                  {product.category}
                </div>

                {/* Contenido del slide */}
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 text-white">
                  <div className="max-w-3xl">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 animate-fade-in-up">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-lg sm:text-xl text-white/90 mb-4 animate-fade-in-up line-clamp-2" style={{ animationDelay: '0.1s' }}>
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                      {product.discount_percentage && product.discount_percentage > 0 ? (
                        <>
                          <span className="text-2xl sm:text-3xl font-bold line-through text-white/60">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-3xl sm:text-4xl font-bold text-green-400">
                            {formatPrice(product.price - (product.price * product.discount_percentage / 100))}
                          </span>
                        </>
                      ) : (
                        <span className="text-3xl sm:text-4xl font-bold">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    <div className="mt-4">
                      <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        Click para ver detalles →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Botón anterior */}
          <button
            onClick={(e) => {
              e.preventDefault();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Botón siguiente */}
          <button
            onClick={(e) => {
              e.preventDefault();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicadores (dots) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  goToSlide(index);
                }}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 h-3 bg-white rounded-full'
                    : 'w-3 h-3 bg-white/50 hover:bg-white/70 rounded-full'
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Contador de slides */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-sm font-medium">
            {currentSlide + 1} / {products.length}
          </div>
        </div>

        {/* Indicador de autoplay */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors duration-300"
          >
            <Circle
              className={`w-2 h-2 ${
                isAutoPlaying ? 'fill-green-500 text-green-500 animate-pulse' : 'fill-gray-400 text-gray-400'
              }`}
            />
            <span>{isAutoPlaying ? 'Reproducción automática' : 'Pausado'}</span>
          </button>
        </div>

        {/* Miniaturas debajo del slider */}
        <div className="hidden lg:grid grid-cols-6 gap-4 mt-8">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/producto/${product.id}`}
              onClick={() => goToSlide(index)}
              className={`relative overflow-hidden rounded-2xl transition-all duration-300 group/thumb ${
                index === currentSlide
                  ? 'ring-4 ring-turquoise-500 scale-105'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <div className="aspect-square">
                <img
                  src={product.image || '/placeholder-product.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                <p className="text-white text-xs font-medium truncate">
                  {product.name}
                </p>
              </div>
              {product.discount_percentage && product.discount_percentage > 0 && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{product.discount_percentage}%
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}