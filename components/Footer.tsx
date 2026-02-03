'use client';

import { Heart, Sparkles } from 'lucide-react';

/**
 * Componente Footer - Pie de página de la landing
 * Incluye nombre del negocio, copyright y mensaje
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Contenido principal del footer */}
        <div className="text-center space-y-6">
          {/* Logo/Nombre */}
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-pastel-yellow-400" />
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-turquoise-400 via-pastel-yellow-400 to-soft-pink-400 bg-clip-text text-transparent">
              Ilusión Creativa
            </h3>
            <Sparkles className="w-6 h-6 text-soft-pink-400" />
          </div>

          {/* Descripción */}
          <p className="text-gray-300 max-w-md mx-auto">
            Tu librería de confianza en Itaembé Guazú
            <br />
            Artículos escolares y personalizados
          </p>

          {/* Dirección y teléfono */}
          <div className="text-sm text-gray-400 space-y-1">
            <p>📍 Cancharana 5067, Itaembé Guazú</p>
            <p>📱 WhatsApp: 3764895527</p>
          </div>

          {/* Separador */}
          <div className="w-48 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto"></div>

          {/* Copyright y mensaje */}
          <div className="text-sm text-gray-400 space-y-2">
            <p className="flex items-center justify-center gap-2">
              Hecho con <Heart className="w-4 h-4 fill-soft-pink-400 text-soft-pink-400 animate-pulse" /> para la comunidad
            </p>
            <p>
              © {currentYear} Librería Ilusión Creativa. Todos los derechos reservados.
            </p>
          </div>

          {/* Links rápidos (opcional) */}
          <div className="flex justify-center gap-6 text-sm">
            <a href="#servicios" className="text-gray-400 hover:text-turquoise-400 transition-colors duration-300">
              Servicios
            </a>
            <span className="text-gray-600">|</span>
            <a href="#galeria" className="text-gray-400 hover:text-turquoise-400 transition-colors duration-300">
              Galería
            </a>
            <span className="text-gray-600">|</span>
            <a href="#contacto" className="text-gray-400 hover:text-turquoise-400 transition-colors duration-300">
              Contacto
            </a>
          </div>
        </div>

        {/* Decoración inferior */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 bg-turquoise-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-pastel-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-soft-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </footer>
  );
}
