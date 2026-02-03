'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';

/**
 * Componente PhotoSlider - Slider automático de fotos
 * Incluye navegación manual, indicadores y autoplay
 */
export function PhotoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Array de slides
  // IMPORTANTE: Reemplazá estas URLs con tus fotos reales
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
      title: 'Todo para empezar el año escolar',
      subtitle: 'Útiles de calidad al mejor precio',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&q=80',
      title: 'Personalizamos tus artículos',
      subtitle: 'Diseños únicos hechos especialmente para vos',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&q=80',
      title: 'Variedad en artículos escolares',
      subtitle: 'Encontrá todo lo que necesitás en un solo lugar',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=1200&q=80',
      title: 'Arte y creatividad',
      subtitle: 'Materiales para dar vida a tus ideas',
    },
  ];

  // Autoplay del slider
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Pausar autoplay cuando el usuario navega manualmente
    setTimeout(() => setIsAutoPlaying(true), 10000); // Reanudar después de 10 segundos
  };

  const goToPrevious = () => {
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentSlide + 1) % slides.length;
    goToSlide(newIndex);
  };

  return (
    <section className="relative py-12 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado opcional */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-turquoise-600 mb-2">
            Conocé nuestro local
          </h2>
          <p className="text-gray-600">
            Un vistazo a nuestros productos y trabajos
          </p>
        </div>

        {/* Contenedor del slider */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
          {/* Slides */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105'
                }`}
              >
                {/* Imagen de fondo */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Contenido del slide */}
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 text-white">
                  <div className="max-w-3xl">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 animate-fade-in-up">
                      {slide.title}
                    </h3>
                    <p className="text-lg sm:text-xl text-white/90 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón anterior */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Botón siguiente */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicadores (dots) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
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
            {currentSlide + 1} / {slides.length}
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

        {/* Miniaturas debajo del slider (opcional) */}
        <div className="hidden lg:grid grid-cols-4 gap-4 mt-8">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`relative overflow-hidden rounded-2xl transition-all duration-300 group/thumb ${
                index === currentSlide
                  ? 'ring-4 ring-turquoise-500 scale-105'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <div className="aspect-video">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                <p className="text-white text-sm font-medium truncate">
                  {slide.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
