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
            <div className="flex flex-col items-center leading-none">
              <h3 className="text-4xl font-logo relative" style={{ color: '#a3d977' }}>
                Ilus
                <span className="relative inline-block">
                  <span style={{ fontFamily: 'Pacifico' }}>ı</span>
                  {/* Foquito para footer */}
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 animate-float">
                    <svg width="16" height="22" viewBox="0 0 24 32" fill="none">
                      <path d="M18.84 4.61a4.5 4.5 0 0 0-6.36 0L12 5.09l-.48-.48a4.5 4.5 0 0 0-6.36 6.36l.48.48L12 17.81l6.36-6.36.48-.48a4.5 4.5 0 0 0 0-6.36z" fill="#9b6bb5" stroke="#8b5ba5" strokeWidth="1.5"/>
                      <path d="M12 7c-1-1-2.5-1-3.5 0-.8.8-.8 2 0 2.8L12 13l3.5-3.2c.8-.8.8-2 0-2.8-1-1-2.5-1-3.5 0z" fill="white"/>
                      <line x1="12" y1="18" x2="12" y2="22" stroke="#a3d977" strokeWidth="2.5"/>
                      <line x1="10" y1="22" x2="14" y2="22" stroke="#a3d977" strokeWidth="2.5"/>
                    </svg>
                  </span>
                </span>
                ón
              </h3>
              <span className="text-lg font-creativa tracking-wider mt-1" style={{ color: '#9b6bb5' }}>
                CREATIVA
              </span>
            </div>
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
            <a href="#catalogo" className="text-gray-400 hover:text-turquoise-400 transition-colors duration-300">
              Catálogo
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
