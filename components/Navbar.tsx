'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Menu, X,Wand2} from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';

/**
 * Componente Navbar - Barra de navegación superior
 * Incluye logo, links de navegación y botón de WhatsApp
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const whatsappNumber = '3764895527';
  const whatsappMessage = encodeURIComponent('¡Hola! Me gustaría consultar 😊');

  // Detectar scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#galeria', label: 'Galería' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-turquoise-400 to-turquoise-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-turquoise-600 to-soft-pink-500 bg-clip-text text-transparent">
                Ilusión Creativa
              </span>
            </div>
          </a>

          {/* Links de navegación - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors duration-300 hover:text-turquoise-600 ${
                  isScrolled ? 'text-gray-700' : 'text-gray-800'
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Botón WhatsApp - Desktop */}
            <WhatsAppButton
              phoneNumber={whatsappNumber}
              message={whatsappMessage}
              className="flex items-center gap-2 bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-white px-5 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden lg:inline">WhatsApp</span>
            </WhatsAppButton>
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-turquoise-100 text-turquoise-600 hover:bg-turquoise-200 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-turquoise-50 hover:text-turquoise-600 rounded-lg font-medium transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}

            {/* Botón WhatsApp - Móvil */}
            <WhatsAppButton
              phoneNumber={whatsappNumber}
              message={whatsappMessage}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-white px-5 py-3 rounded-full font-medium shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Contactar por WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      )}
    </nav>
  );
}
